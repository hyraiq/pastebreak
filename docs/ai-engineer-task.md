# AI Engineer Tech Challenge Task

## Setup

- Sign up with a free account at [LangSmith](https://smith.langchain.com)
- Generate API keys for LangSmith
- Take src/breakdown/runnable/dataset/dataset.jsonl and use that
  to [create a LangSmith dataset](https://docs.smith.langchain.com/evaluation/how_to_guides/manage_datasets_in_application#set-up-your-dataset)
  through the UI

## Pre-requisites

- Node.js v22.12.0 or later, we'd recommend using [nvm](https://github.com/nvm-sh/nvm) and then doing `nvm use` in the
  root

## Installation

In the root...

```bash
nvm use
npm install

# Run the backend
cd backend
# Copy the .env.dist file
cp .env.dist .env

# TODO: Fill in any missing environment variables, including your OpenAI API key, Langsmith API key and dataset ID
# (still within the backend directory), run the experiment
npm run experiment
```

## Task

**Deliverables:**

- Design and implement evaluator(s)
- Iterate on the runnable to improve its performance

Your task is to use LangSmith to evaluate the performance of
the [ExtractPasteRunnable](../backend/src/breakdown/runnable/extract-paste.runnable.ts). The current implementation is
intentionally naive and doesn't suit the task very well!

This runnable takes a user's paste buffer and returns a standardised breakdown of categories and line items so that they
can use it elsewhere.

The `npm run experiment` command will run the experiment, which takes each "example" from the Langsmith dataset and
passes it to the runnable. Within Langsmith you will be able to see the output and the trace of the runnable.

You should [design and implement evaluator(s)](https://docs.smith.langchain.com/evaluation/how_to_guides/custom_evaluator)
that can evaluate the "performance" of the runnable - i.e. how "correct" it is. It's up to you to decide what those
might look like and how they should work. The evaluator metrics will appear in the LangSmith UI and you can use the UI
to compare different experiments to see which examples improved/worsened.

Once you have evaluators in place, you should then iterate on the runnable to improve its performance. Keep some
lightweight notes about what you've done and how it improved the performance. You might improve the prompts,
tweak models (though err towards using inexpensive models for this task), or even split the runnable into smaller
components, reimplement in Langgraph, provide tools or make it more "agentic". It's up to you.

As long as you can keep the same input and output schema, you can change anything inside.

## Time limit

This task is completed async so there's no real way for us to enforce a time limit. We suggest limiting yourself to 1-2
hours as a reference point.

## Git Hygiene

When undertaking this challenge, we ask that you **please do not fork this repository**. Instead, create
a [private repository from this template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

If you can, please work from a branch within your private repository, then create a pull request against main when you
are finished - this will make it easier for us to review.

Additionally once you're finished, invite [@tomtomau](https://github.com/tomtomau) to the repository so he can review
code before the next call.

## Questions

If you have any questions or run into any major issues, reach back out to Tom.
