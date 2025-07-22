---
title: "How I ruined a startup"
description: "Story of how I massively blew out an opportunity because I wanted to prove to others that I was worth the investment"
pubDate: "July 22 2025"
updatedDate: "July 22 2025"
imgDesc: "How a good architecture can still fall apart"
heroImage: "/blogs/post3-hero.png"
---

You know the feeling where you _think_ you know enough, leading you to take risks which may or may not pay off. Well that happened to me...and it did not go well.

February 2025 I get a call from a senior of mine who I had met during a competition. He had started a startup and wanted me to be a part of it. I was really happy because this would technically be my first proper work experience.

I was ready to put my heart and soul into this.

---

## The first meeting

The very first meeting I had with everyone in the startup, I was glazed a lot. I was apparently one of the better developers they have come across and they liked the stuff I did. Obviously my already inflated ego reached points of bursting.

I was given my task list and it was quite simple, **Build The Backend.**

Quite easy, right? I was even given a month's time. Well that's where the downfall happened.

---

## The rabbit hole

![architecture](/blogs/post3-architecture.png)

What you see above was my _proposed_ architecture for this startup's backend. Keep in mind, they were just an **Ecommerce Platform** in the early stages of their release, barely making any revenue.

This itself took me a few days of researching. Multiple beautiful articles were ready, videos watched and people talked to. This was the time where I was starting into devops as well and was learning about scalability and good practices and different infrastructure models etc.

I wanted to put my best foot forward. I wanted to prove that hey the **five years** of efforts learning how to code and problem solve have actually paid off.

**I wanted to build the next Amazon**

---

## How it started

The first few weeks was **peak efficiency**. Even though I had classes, every moment where I wasn't busy would be spent on this.

- I built a **template** that all services could inherit from.
- Setup a **message queue** for cross service communication.
- Setup an **index db** for storing logs, along with a **grafana + loki** log view
- Setup a **notification service** for when things went wrong

And a lot more. Everything followed the best practices (to my knowledge at that time) and I was super happy and proud.

_But the deadline was nearing_

---

## The downfall

As the deadline came closer, my heart started pounding faster and faster. Yes I had all of these amazing helper tools setup and the best practices in place, but to actually use them and integrate them in a working environment took time.

I found myself spending more and more time actually fixing bugs with my subsidiary services than actually getting the main business logic in place.

**I couldn't get CRUD up and running in time**

Every time I had to add something new, I had to make sure it was compliant with all my other services. Had to make sure that the tests were written and passing. Had to make sure the data was being validated properly and what not.

I got overwhelmed. I still remember sitting a day before the deadline with my heads between my knees panicking because

- the backend wasn't done
- I had assignments to submit
- an exam was coming up

On top of this life in general wasn't the best in terms of interpersonal relationships with people.

---

## The last meeting

They asked me, "Hey so when can we deploy the project? Our investor want's to see it tomorrow"

I was at a loss of words. What do I even say? I stuttered and mumbled "It's working, we can deploy in three hours" and they were overjoyed. This investor was a big deal as it would turn out to be the first and _last_ one we ever got. They called be a great guy and an amazing developer and told me that they were proud of me and what not. All I could do was _laugh_.

**three hours?**

You know what I did in those three hours? **nothing**. I was just staring into a wall, trying to figure out how to soften the blow. Did I get a solution? **no**.

I chickned out and blocked everyone on all channels, shifted the entire codebase into the founders name, left all slack channels and disappeared.

My final message to them?

> Hi, This will be the last time you hear from me.
> I wanted to say that I am extremely sorry for everything. You guys are great people and you all took a gamble on me and it didn't pay off.
> I promised a lot and delivered nothing and I shall forever carry this weight in my heart.
> Thank you for everything
> I am sorry
> Goodbye

**I still hate myself for all of this**

---

## What I learnt

![linkedin_post](/blogs/post3-linkedin_post.png)

I saw this linkedin post a few months after all of this happened, which led me to writing this post now.

Having worked in another internship, this time properly I can safely say that **I learnt from my mistakes**

Micro-servicing, having different servers for staging and production, logs, tests, message queues and all that are great to have and probably necessary. But do you need it when your platform just gets a hundred, two hundred people initially? **no**

I was part of a company that ran their entire business off of a single monolith on a 6gb ram server for months and were still having no problems handling load.

I realized that, hey maybe the direction I was at was correct but the execution and planning was blown out of proportion.

Now I am a huge advocate for **Keep it stupidly simple (KISS)**. There is no need to over-complicate things just to boost your ego or as said in the post, your resume. At the end of the day, no-one really cares as long as the work get's done.

Plus what are you going to do? _explain to your product manager why you need aws when you barely make any money?_

I haven't reached out to the initial startup, though I wish I could. I am just way to disgusted by my actions to even think about it.

**Here's to the hope that some other developer doesn't repeat the mistakes I did**
