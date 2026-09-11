import { readdir, readFile } from 'node:fs/promises';
import { generateText, tool, stepCountIs } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// STEP 1 — Load skills
const skills = Object.fromEntries(
  await Promise.all(
    (
      await readdir('skills')
    ).map(async (dir) => {
      const content = await readFile(`skills/${dir}/SKILL.md`, 'utf8');
      const { name, description } = parseSkill(content);
      return [name, { description, content }];
    }),
  ),
);

// STEP 2 — Inject skill index into context
const SYSTEM_PROMPT =
  `${BASE_CONTEXT}\n` +
  '<skills>\n' +
  Object.entries(skills)
    .map(
      ([name, { description }]) =>
        `<skill name="${name}">${description}</skill>`,
    )
    .join('\n') +
  '\n</skills>';

// STEP 3 — Load full content on demand via tool call
export async function chatMessage(message: string) {
  const result = await generateText({
    model: openai('gpt-5'),
    system: SYSTEM_PROMPT,
    prompt: buildPrompt(message),
    tools: {
      load_skill: tool({
        description: `Load full instructions for a skill by name. Available: ${Object.keys(
          skills,
        ).join(', ')}`,
        inputSchema: z.object({ name: z.string() }),
        execute: ({ name }) => {
          if (!skills[name])
            return `No skill named "${name}". Available: ${Object.keys(
              skills,
            ).join(', ')}`;
          return skills[name].content;
        },
      }),
      // ... other tools
    },
    stopWhen: stepCountIs(10),
  });
  return result.text;
}

// STEP 4 — "/skill-name message" expands the skill into the user turn
function buildPrompt(message: string) {
  const match = message.match(/^\/([\w-]+)(?:\s+([\s\S]*))?$/);
  const name = match?.[1];
  if (!name || !skills[name]) {
    return message;
  }

  const request = match?.[2] || `Run the "${name}" skill.`;
  return `<skill name="${name}">\n${skills[name].content}\n</skill>\n\n${request}`;
}
