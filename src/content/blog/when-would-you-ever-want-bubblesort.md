---
title: "When would you ever want bubblesort?"
date: "2026-07-12"
tags: "Algorithms, Software"
excerpt: "Bubble sort is famously useless — except in three niche cases: tiny arrays, real-time rendering, and sorting animations."
---

There are few universal rules in software engineering. But "don't use bubble sort" comes close.

Donald Knuth wrote that bubble sort "seems to have nothing to recommend it, except a catchy name and the fact that it leads to some interesting theoretical problems".

Knuth has been wrong before. Let's see if he's wrong here.

## The small array case

Bubble sort is faster than quicksort or mergesort for very small arrays.

This matters because most fast sorting algorithms work recursively. When you apply quicksort to 2^20 random integers, you eventually end up sorting 2^17 subpartitions of 8 integers each. Switching to bubble sort for those tiny subpartitions would be a nice optimization.

Production sorting algorithms do use hybrid approaches. But they overwhelmingly use insertion sort instead. Insertion sort is very fast for small arrays and better at using the hardware.

On some very particular hardware, bubble sort still ends up better. There's an NVIDIA study that used it. But you probably don't have that hardware.

## The real-time rendering case

Game development has a situation uniquely suited to bubble sort.

Two properties make it work:

Each individual step is very fast and easily suspendable. Each swap leaves the array more ordered than before. Other sorts can move values away from their final positions in intermediate stages.

Say you have objects on a screen where some occlude others. You want to render objects closest to the camera first. That way you can determine which objects they hide and save time rendering those objects.

There's no correctness cost for rendering objects out of order. Just a potential performance cost. The more ordered the array, the happier you are. But you can't spend too much time sorting because you have strict real-time constraints.

Bubble sort works well here. You can run it a little bit each frame and get better ordering than when you started.

## The animation case

Here's a fun one.

You have a random collection of randomly colored particles. You want to animate them sorting into a rainbow spectrum.

If you make each frame of the animation one pass of bubble sort, the particles will all move smoothly into the right positions.

This might not actually be done in practice. Running a better sort to calculate each particle's final displacement and animating them moving directly would probably look smoother. But the bubble sort approach is elegant in its simplicity.

## The bottom line

Three niche use cases for bubble sort.

You'll probably never need it.

But if you're working with tiny arrays, rendering 3D objects in real time, or making a cool sorting visualization, bubble sort might just be the right tool.

Sometimes the "wrong" algorithm is exactly what you need.

Source: https://buttondown.com/hillelwayne/archive/when-would-you-ever-want-bubblesort/