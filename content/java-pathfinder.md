---
title: Java PathFinder 1 (JPF1)
---

# Java PathFinder 1 (JPF1)

**A Formal Methods Tool for Java**

![](/img/symbols.gif)
  
  
  

## Abstract

Java PathFinder 1 (JPF1) is a
translator from a subset of Java 1.0 to PROMELA, the programming language of
the
[SPIN](http://netlib.bell-labs.com/netlib/spin/whatispin.html)
model checker. The purpose of JPF is
to establish a framework for verification and debugging of Java programs
based on model checking. The system is especially suited for analyzing
multi-threaded Java applications, where normal testing usually falls short.
The system can find deadlocks and violations of boolean assertions stated by
the programmer in a special assertion language. The user guide explains in
detail how to use the system. Please contact Klaus Havelund
[Klaus.Havelund@jpl.nasa.gov](mailto:Klaus.Havelund@jpl.nasa.gov)
for details about installation.

## Development history

I conceptualized and developed the first prototype in 1998. JPF1 translates a
substantial subset of Java 1.0 into Promela for analysis with SPIN.

I was also involved in the initial development of
[Java PathFinder 2](http://ase.arc.nasa.gov/visser/jpf), led by Willem Visser.
The second generation is written in Java and checks Java bytecode directly.

## User Guide

![](/img/gball-tr.gif)
*Java PathFinder User Guide (K. Havelund)*
[[pdf](pathname:///Publications/jpf-manual.pdf)
]
(Tech. Report)

## Published Papers

![](/img/gball-tr.gif)
*Model Checking Java Programs Using Java PathFinder
(K. Havelund, T. Pressburger)*
[[pdf](pathname:///Publications/jpf-sttt.pdf)
]
(International Journal on Software Tools for Technology Transfer, STTT,
2(4) April 2000. Special issue containing selected submissions for the
4'th SPIN workshop, Paris, November, 1998)

![](/img/gball-tr.gif)
*Applying Model Checking in Java Verification
(K. Havelund, J. Skakkebaek)*
[[pdf](pathname:///Publications/jpf-fm99.pdf)
]
(6th SPIN Workshop in connection with FM99 Toulouse)

  
  

![](/img/sojourner2.gif)
  
Named after
[Mars PathFinder](http://mars.jpl.nasa.gov/MPF/index1.html)

---

Created by [Klaus Havelund](/)  
*Last modified: April 23, 2000*
