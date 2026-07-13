---
date: 2024-08-20
title: CMA-CGM - Container Onboarding
description: My team built a container onboarding engine and UI used by Cargo Readiness Officers to move containers through weighing, customs, dangerous-goods and cooling checks before berthing.
heroImage: /logos/cma-cgm.png
category: pro
tags:
  - Logistics
  - Shipping
  - Operations
---

I worked on a **container onboarding engine and its UI** at CMA-CGM, a global leader in container shipping.

Before a container can sail, it has to clear several gates: weighing, customs, a dangerous-goods check, and a check for cooling/refer necessities. My clients were the **Cargo Readiness Officers**, the people responsible for making sure customers fill their forms and actually send the container.

## The problem

Customers routinely overbook: they reserve slots with several shippers at once and only honor the one with the lowest price on the day. The hard question for the operations team is then whether to **abandon** a no-show customer or **chase** them to recover the shipment.

This caused a flood of last-minute cancellations, which is expensive: the slot is already allocated, the ship is about to berth, and there's no container to fill it.

## What we shipped

We moved cancellations earlier in the timeline. Before the project, **70% of cancellations arrived within 2 days of berthing**. After, **only 30%**, and now **40% of cancellations happen more than a week before departure** (numbers slightly edited to respect client confidentiality).

That's a real shift-left: instead of reacting at the dock, the team gets a week of lead time to reassign the slot or chase the customer.
