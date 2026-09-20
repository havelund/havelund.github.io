---
title: Research
---

# Research

Formal methods for understanding, monitoring, and verifying software systems.

## Research areas

### Runtime verification

My main focus is runtime monitoring: designing techniques and logics for checking software behavior as it executes.

See [Publications](/publications) for the research and [Software](/software) for implementations.

### Model checking

I developed the first Java PathFinder prototype in 1998 and helped initiate its second generation, exploring how model checking could be applied directly to Java programs.

At Aalborg University with Kim Larsen (1996–1997), I used UPPAAL to analyze Bang & Olufsen protocols. We explained a known but unresolved bug that had persisted for ten years and became critical when control shifted from handheld remotes to automation.

### Formal specification languages

From 1984 to 1991, I helped design RSL, the specification language of the [RAISE project](https://raisetools.github.io), and co-authored most of *The RAISE Specification Language*.

RAISE (Rigorous Approach to Industrial Software Engineering), initiated by [Dines Bjoerner](http://www.imm.dtu.dk/~db), combines a formal development method with a wide-spectrum language. RSL brings together imperative and functional programming, pre/postconditions, predicate logic, sets and maps, algebraic specification, process algebra, and modules. Its refinement framework connects high-level specifications to code.

### Theorem proving

During 1994–1996, I worked on proving programs correct with [PVS](http://pvs.csl.sri.com/), developing a practical understanding of mechanized proof.

This work was based in Paris and included visits to SRI. Related proof developments are listed on the [Software page](/software#tool-garbage-collector-refinement).

### Programming language semantics

My master's and Ph.D. research at [DIKU, University of Copenhagen](http://www.diku.dk), explored denotational semantics, operational semantics, and temporal logic for concurrent languages.

With [Neil Jones](http://www.diku.dk/~neil), my master's thesis refined an abstract denotational semantics into a compiler-like semantics in six steps.

My Ph.D. developed the *Fork Calculus*: a process algebra with a fork operator, motivated by temporal reasoning about [Concurrent ML](http://cml.cs.uchicago.edu/). Inspired by [Extended ML](http://homepages.inf.ed.ac.uk/dts/eml/), it also proposed an Extended CML combining programs with axioms.

My supervisors were [Klaus Grue](http://www.diku.dk/~grue/) and [Kim Guldstrand Larsen](http://www.cs.aau.dk/~kgl/). I was hosted by [Patrick Cousot](http://www.di.ens.fr/~cousot/) at École Normale Supérieure in Paris. Both theses are listed under [Publications](/publications#theses).

## Collaborative projects

### Survivable Software

A GCC-based project combining instrumentation, monitoring, and static analysis of C programs. It developed the InterAspect instrumentation framework.

[Project](http://www.fsl.cs.sunysb.edu/ssw/index.html) · [InterAspect](http://www.fsl.cs.sunysb.edu/interaspect)

### CMACS

Computational Modeling and Analysis for Complex Systems, an NSF Expeditions project, also known as *Model Checking and Abstract Interpretation* (MCAI 2.0).

[Project](http://cmacs.cs.cmu.edu)
