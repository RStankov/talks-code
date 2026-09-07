## React

- New prop added that is unused or used inconsistently.
- Multiple className-like props (`wrapClassName`, `innerClassName`) — unclear responsibility.
- Props that could be grouped aren't.
- New variant that complicates the component API without clear benefit.
- Prop names inconsistent with similar components.
- Overuse of hooks.
- Suggest extracting and grouping multiple hooks into a custom hook.
- Suggest opportunities for extracting new components.
- Functional components with hooks
- Proper dependency arrays in hooks
- Flag any HTML element that adds no props, class, style, layout, or semantic meaning and can be removed or merged with a sibling/parent - without changing the rendered output.
- Multiple `useMemo` / `useEffect` calls with the same dependencies — collapse into one.
- `useEffect` syncing or deriving state that could be computed during render.
- Instance, listener, timer, or observer created per render or per click with no cleanup — memory leak and duplicate handlers.
- Repeated `getElementById` in a hot path, or script state written to the global namespace instead of a closure.
- The same value held in two contexts, two providers, or a context plus local state — merge the providers and derive the rest.
- The same markup and logic appearing more than once — extract one component with the variant as a typed prop and a `data-*` attribute.
