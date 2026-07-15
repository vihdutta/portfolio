export interface ContributionPR {
  tag: string;
  url: string;
  title: string;
  body: string[];
}

export interface ContributionStat {
  value: string;
  label: string;
  highlight?: boolean;
}

export interface Contribution {
  id: string;
  name: string;
  repo: string;
  repoUrl: string;
  mergedPrUrl: string;
  summary: string;
  stats: ContributionStat[];
  intro: string[];
  prs: ContributionPR[];
  reflection: string[];
}

export const contributions: Contribution[] = [
  {
    id: 'manim',
    name: 'Manim',
    repo: 'ManimCommunity/manim',
    repoUrl: 'https://github.com/ManimCommunity/manim',
    mergedPrUrl: 'https://github.com/ManimCommunity/manim/pull/4694',
    summary:
      'I decided to contribute to ManimCommunity/manim, an animation engine for explanatory math videos.',
    stats: [
      { value: '~31K', label: 'GitHub stars' },
      { value: '3', label: 'Pull requests' },
      { value: 'Merged', label: 'PR #4694', highlight: true },
    ],
    intro: [
      `I decided to contribute to ManimCommunity/manim, an animation engine for explanatory math videos. This framework particularly allows one to write concise Python scripts to generate mathematical animations and is popular amongst researchers and YouTubers. In fact, I had chosen this project because I discovered 3Blue1Brown uses it to create their math videos. Further, choosing this project provides me the sense of "giving back"-- the Manim framework was originally created by 3Blue1Brown too.`,
      `When the creator of 3Blue1Brown, Grant Sanderson, was finishing his undergraduate degree in mathematics at Stanford University, he wanted to create a project that would enable him to illustrate "mathematical functions better as transformations". He fiddled around and created a simple Python script to complete that task. Later, he used the script to produce the first video on 3Blue1Brown. His first video was well received, and so Grant kept updating his tool to create new videos, and the cycle continued. Today, 3Blue1Brown is one of the best known math channels on YouTube with over 8 million subscribers.`,
      `While 3Blue1Brown started gaining traction, Grant discovered he still had to spend a lot of time balancing his life and creating videos– he was having less and less time to be attentive to issues the community created on Manim's github repository. Further, with 3Blue1Brown's increasing popularity, people became interested in Manim but noted it was difficult to work on as it was maintained primarily by Grant as a personal project. Fans of Grant forked Manim into what is now ManimCE– Manim Community Edition. This version of Manim is backed by organizations and maintains Manim as a community-supported, developer friendly version of the project Grant started.`,
    ],
    prs: [
      {
        tag: 'PR #4694 · Merged',
        url: 'https://github.com/ManimCommunity/manim/pull/4694',
        title: 'Consistent stroke width when scaling compound objects',
        body: [
          `When scaling built-in compound objects in Manim, components of the compound object that have 0 stroke width incorrectly scale with the rest of the object. For example, if you scale a number line from its original size to a smaller size then back to its original size, the text associated with the number line will become much thicker when it should have retained its original boldness.`,
          `To implement this issue, I first spent some time looking through the compound object class in the source code. Once I had a comprehension of the class and understood how the scale function associated with the class worked, I noted that the code simply scaled the compound object class linearly– that is, it took every object in the compound object and applied the same scaling throughout it. To fix this issue, I created a loop that went through each object in the compound object and multiplied that specific object's stroke width with the scaling factor. That way, subobjects which defaulted to a "0" stroke width would not have its stroke width affected and the other parts of the compound object would.`,
        ],
      },
      {
        tag: 'PR #4701',
        url: 'https://github.com/ManimCommunity/manim/pull/4701',
        title: 'Correct center of rotation for fixed-orientation text',
        body: [
          `The calculated center for fixed orientation objects in Manim is incorrect for text strings. Specifically, the text's center of rotation is placed on the left edge of the text, instead of the actual center. This bug is painfully obvious when rotating the text in the interactive viewer as the text "orbits" where it should be.`,
          `Notably, this issue involved incorrect interaction with text. As I was already familiar with debugging text issues from my first PR, I decided to tackle the issue with confidence. Fortunately, this confidence was not in vain– the issue was indeed very similar to the first PR's text issue– the fix_orientation function needed to consider the relation between child and parent objects for the text. After independently applying a fixed orientation to all subobjects of the parent object in the fix_orientation function, the issue appeared to be resolved based on the reproduction code the issue poster provided.`,
        ],
      },
      {
        tag: 'PR #4703',
        url: 'https://github.com/ManimCommunity/manim/pull/4703',
        title: 'Regression test for the stroke-width fix',
        body: [
          `This PR was simply for quality control of PR1. I did not initially include a regression test for PR1, so I decided to create another PR with the integration test.`,
        ],
      },
    ],
    reflection: [
      `I must say I was very excited to start this project because I've always wanted to contribute to open source since a few years ago. There was a time I was working on a small single player game using Rust. During the development, I discovered that I had a compiler error even though I was quite sure my code was correct. After some digging, I discovered through a Github issue that generating constants at compile time in a particular built-in structure was not yet implemented in the programming language itself! I always thought that open source was interesting– even more so after having a personal motivation to fix a problem in a project I was using. Unfortunately, I was unfamiliar with open source, let alone compile time programming language issues. While I still have to look into programming language specifics to contribute to Rust one day, this project enabled me to become comfortable with how open source works in general.`,
      `It was daunting to see the documentation page when starting my first PR. However, I discovered it was not nearly as complicated as I thought. Many of the processes were automated/shown with the PR request itself, and the format for a PR request was autofilled when I created it. The code was simple as any other project to download, and testing the bug-producing code didn't cause any issues once I had set up my uv environment and installed all the dependencies. After that, the hard part was finding what Python files were relevant in the sea of folders and files.`,
      `Fortunately, I was able to use AI to help pinpoint what files may be of interest for me. Once I discovered what files were relevant to the issue at hand, I took a great deal of time to review the contents. It was a mistake to read through all the files the AI mentioned, however. I noted this after discovering there was only one function relevant to the bug at hand. Once I found the function, my review of a large amount of Manim's code led me to quickly see that the current stroke scale function neglected the fact that the different subobjects of the object being stroke scaled could have different strokes– the function incorrectly multiplied the new scaling factor for each subobject based on the parent object's stroke scale. I thought it was fascinating that despite how much preparation it required me to find the issue, the bug and fix were both hardly 10 lines of code.`,
      `Submitting the PR is where I had the most interaction with the community of maintainers. I discussed briefly in the Discord, and was pleasantly surprised how quickly the maintainers were wishing to help. In fact, just a few hours after I asked how to merge my changes (because the merge requirements were complete), a maintainer said they would take a look– when I checked my PR next, my changes were merged! I was pleasantly surprised with how nice the developers were with helping me figure out what are likely rudimentary questions.`,
      `Lastly, a large change I had made from my original plan was creating my regression test for the bug after I had submitted both PRs. In hindsight, I should have followed Test-Driven Development, writing the regression test before or alongside the bugfix so the test could fail first (confirming the bug), then pass after my fix (confirming the solution). Instead, I wrote the regression test after submitting both PRs, which forced an additional review cycle and slowed down the acceptance process– a concrete example of how deviating from TDD increases downstream cost, consistent with the risk and scheduling principle that the cost of a change increases the later it is made in the process.`,
    ],
  },
];

export const getContribution = (id: string): Contribution | undefined =>
  contributions.find((contribution) => contribution.id === id);
