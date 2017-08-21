const OPERATIONS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
};

export function addToMemory(memory, value) {
  if (!value.match(/\d/)) {
    if (!memory.match(/\d$/)) {
      return memory;
    }

    if (!OPERATIONS[value]) {
      return memory;
    }

    return `${memory} ${value} `;
  }

  if (memory.match(/(^| )0$/)) {
    return `${memory.slice(0, -1)}${value}`;
  }

  return `${memory}${value}`;
}

export function removeFromMemory(memory) {
  const newMemory = memory.match(/\d$/)
    ? memory.slice(0, -1)
    : memory.slice(0, -3);

  return newMemory || '0';
}

export function calculate(memory) {
  const chunks = memory.split(' ');
  let value = parseInt(chunks[0], 10);

  for (let i = 1; i < chunks.length; i += 2) {
    const other = chunks[i + 1];
    if (typeof other === 'undefined' || other.length === 0) {
      continue;
    }

    const operation = OPERATIONS[chunks[i]];
    if (!operation) {
      throw new Error(`Invalid "${chunks[i]}" operand`);
    }

    value = operation(value, parseInt(other, 10));
  }

  return value.toString();
}
