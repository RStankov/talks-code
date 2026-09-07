# Code Smells

Every entry here is a judgement call, never a hard violation — report as "possible Feature Envy", not "violates X". Two rules bind them:

- **The codebase overrides.** If the surrounding code consistently does the thing, it's the convention, not a smell.
- **The diff must show it.** Only flag a smell you can point at within the changed code — not one you infer from the file's history.

**P2**

- **Feature Envy** — a method reaches into another object's data more than its own → move it onto the data it envies.
- **Data Clumps** — the same few fields or params keep travelling together → bundle them into one type.
- **Primitive Obsession** — a string or primitive standing in for a domain concept → give the concept its own small type.
- **Repeated Switches** — the same `switch` / `if`-cascade on the same type appears in more than one place in the diff → polymorphism, or one shared map.
- **Shotgun Surgery** — one logical change forced scattered edits across many files → gather what changes together into one module.
- **Divergent Change** — one file edited for several unrelated reasons in this diff → split so each module changes for one reason.

**P3**

- **Message Chains** — long `a.b().c().d()` navigation the caller shouldn't depend on → hide the walk behind one method on the first object.
- **Middle Man** — a class or function that mostly just delegates onward → cut it, call the real target.
- **Refused Bequest** — a subclass that ignores or overrides most of what it inherits → drop the inheritance, use composition.
