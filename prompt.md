If you're still writing prompts the way you did in 2023, you're leaving performance on the table. I know because I was doing exactly that about a year ago — copying the same "you are a helpful assistant" preambles, adding increasingly desperate ALL-CAPS instructions, and wondering why my outputs kept drifting.

The thing is, prompt engineering best practices in 2026 look almost nothing like they did when ChatGPT first dropped. The discipline has split cleanly in two: casual prompting (which anyone can do — the models got better at reading intent) and production context engineering (which is a genuine engineering skill). I build systems where prompts run thousands of times, and getting them right compounds in value every single execution. Here's what I've learned actually works.

Prompt Engineering Is Dead. Context Engineering Is What Replaced It.
In June 2025, Andrej Karpathy posted on X what a lot of practitioners were already feeling: the term "prompt engineering" trivialises what we actually do. His framing was elegant — the LLM is a CPU, the context window is RAM, and your job is to be the operating system, loading working memory with exactly the right code and data for each task.

The real failure mode in production isn't a bad prompt. It's bad context assembly. Phil Schmid from Hugging Face nailed it: most agent failures aren't model failures anymore — they're context failures. You retrieved the wrong documents. You stuffed too much history into the window. You forgot to include the tool definitions. The prompt itself was fine.

LangChain formalised four strategies for this: write (persist context externally), select (retrieve what's relevant via RAG), compress (summarise and compact), and isolate (separate contexts for different agents). If you use Claude Projects, you're already doing context engineering — your project system prompt is persistent instruction plus curated context applied to every conversation. It's worth treating that like production code, because functionally, it is.

Start Simple. Expand Based on What's Wrong.
This is the single most useful workflow I've adopted, and it contradicts the instinct most of us have to write exhaustive prompts upfront.

Research from Levy, Jacoby, and Goldberg (2024) found that LLM reasoning performance starts degrading around 3,000 tokens — well below the technical maximums we all get excited about. The practical sweet spot for most tasks is 150–300 words. That's not a lot. It forces you to be specific rather than comprehensive.

The process is dead simple: write the shortest version that describes your intent. Test it. Identify what's actually wrong or missing in the output. Add only what fixes that specific gap. Repeat. You end up with a prompt that's lean and targeted instead of a 500-word archaeological dig where you can't tell which instruction is actually doing the work.

Why Long Prompts Hurt More Than They Help
Three reasons long prompts quietly degrade your results.

First, attention scales quadratically. Every token you add makes the model work harder to figure out what matters. This isn't theoretical — it's O(n²) in the transformer architecture, and it shows up as vaguer, less focused outputs.

Second, the "lost in the middle" problem is real and well-documented. Liu et al. (2024) showed a U-shaped performance curve across every model they tested: accuracy is highest when relevant information appears at the beginning or end of the context, with over 30% accuracy drop for information buried in the middle. The paper has over 2,500 citations for good reason. Put your critical instructions first and last. Not the middle. Never the middle.

Third, there's the maintenance cost nobody talks about. Debugging a 500-word prompt when output quality suddenly drops is miserable. You change one sentence and three other behaviours shift. Shorter prompts are easier to reason about, easier to test, and easier to fix.

Model-Specific Tactics That Actually Matter
Most prompt engineering guides treat all models the same. That's wrong, and it costs you performance every time you port a prompt between providers.

Claude — XML Tags and Literal Instructions
Claude 4.x models follow instructions literally. If you don't ask for something, you won't get it — the "above and beyond" behaviour from earlier versions is gone. This is actually a good thing once you adjust. You get predictable, controllable outputs.

XML tags (<instructions>, <context>, <example>) are genuinely the best structuring method for Claude. Not Markdown, not numbered lists — XML tags. Wrap your few-shot examples in <example> tags. Reference tagged content in your instructions ("Using the data in <context> tags..."). It makes a measurable difference.

One thing that caught me off guard: aggressive language actively hurts newer Claude models. "CRITICAL!", "YOU MUST", "NEVER EVER" — these overtrigger and produce worse results than calm, direct instructions. Just say what you want. Claude listens.

For extended thinking, use adaptive mode and let the model decide when it needs to reason deeply. Don't pass thinking blocks back as input on subsequent turns.

GPT-5 — Conversational, Skip Explicit CoT
GPT-5 is a router-based system — multiple models behind a single endpoint. Saying "think hard about this" in your prompt literally triggers the reasoning model. Which means explicitly adding "think step by step" to reasoning tasks can actually hurt performance. OpenAI's own docs warn against this.

The practical advice: keep prompts conversational, pin production apps to specific model snapshots (e.g., gpt-5-2025-08-07) because the router behaviour changes between versions, and try zero-shot before reaching for few-shot. GPT-5 is surprisingly good at inferring intent from minimal context.

Gemini — Shorter and More Direct
Gemini's 2M token context window is impressive, but it makes placement decisions even more consequential. Google's prompt engineering whitepaper recommends always including few-shot examples (zero-shot is explicitly not preferred), and placing specific questions at the end, after your data context. Gemini prefers shorter, more direct prompts than either Claude or GPT.

Four Techniques Worth Using (and When to Skip Them)
The problem with most technique roundups is they list everything without telling you when to actually use each one. So here's the honest version.

Few-shot prompting remains one of the highest-ROI techniques available. Three to five diverse examples, wrapped in <example> tags for Claude. A surprising finding from Min et al. (2022): the label space and input distribution matter more than whether individual example labels are correct. Even randomly labelled examples outperform zero-shot. So stop agonising over perfect examples and focus on covering the diversity of your input space.

Chain-of-thought still works brilliantly for standard models on hard tasks — research shows a 19-point boost on MMLU-Pro with CoT. But skip explicit CoT for reasoning models (o-series, Claude Extended Thinking, Gemini Thinking Mode). They already do it internally. Adding "think step by step" is like telling someone who's already thinking to please start thinking.

Role prompting is useful for open-ended and creative tasks but has negligible effect on classification and factual QA. Don't cargo-cult it into every prompt.

Positive framing over negation — "only use real data" consistently outperforms "don't use mock data." This is the Pink Elephant Problem: telling a model not to do something forces it to process that concept first. Reframe every negative instruction as a positive one.

Skip Tree-of-Thought and LATS unless you have a very specific, high-stakes task that justifies the compute cost. For 99% of use cases, they're overkill.

Prompts Are Code — Treat Them Like It
This is the part that separates someone who uses AI from someone who ships with it.

Version control your prompts. Prompt drift is real — you tweak something on a Thursday afternoon, forget what you changed, and spend Monday debugging output that used to work fine. If your prompt runs more than once, it belongs in version control.

Build a golden test set: representative inputs with expected outputs. Run it on every prompt change. This is just regression testing, except instead of code, you're testing the instructions that generate the code.

Structure your prompts for caching. Place static content first (system instructions, few-shot examples, tool definitions) and variable content last (user messages, query-specific data). With Anthropic's prompt caching, this can cut costs by up to 90% and latency by 85%. OpenAI offers automatic caching with 50–90% discounts depending on the model. The savings are substantial when you're running thousands of completions.

For production systems, Promptfoo (open-source, 51K+ developers) brings CI/CD discipline to prompts — automated testing, red teaming, the works. If you're already treating your application code seriously, your prompts deserve the same treatment.

Is Learning Prompt Engineering Still Worth It in 2026?
The job title is effectively gone. Fast Company reported in May 2025 that prompt engineering as a standalone role "has all but disappeared," with 68% of firms now providing it as standard training across all roles. A Microsoft-commissioned survey of 31,000 workers ranked Prompt Engineer second to last among new roles companies plan to add.

But the skill? More valuable than ever — it just got absorbed into the job description of everyone who works with AI. What's actually valuable now is designing context assembly systems, writing evals, understanding model-specific behaviour, and knowing when a technique helps versus when it's noise. Not clever phrasing.

There's also the automation paradox worth acknowledging. Tools like DSPy and OPRO can algorithmically discover better prompts than humans write. But someone still needs to design the metrics, curate the examples, and decide what "better" means. The craft moved up a level of abstraction.

If you run the same prompts repeatedly — and if you're building anything real, you do — the compounding ROI on a well-tested prompt is obvious. A 5% improvement across 10,000 executions isn't a rounding error. It's the whole point.

Three Things to Do Today
Audit your longest prompts. Anything over 300 words should be questioned — is every sentence earning its place, or is it there because you were nervous?

Check where your critical information sits in the context window. If it's in the middle, move it. Beginning or end. This is free performance.

If you use Claude Projects, open your project system prompt right now and treat it like production code. Version it. Test it. Iterate on what's actually broken instead of what might hypothetically go wrong.

The models keep getting smarter. But the gap between a careless prompt and a well-engineered context isn't closing — it's widening. The people who take this seriously will keep shipping better work. That's not hype. That's just compounding returns on a skill worth practising.