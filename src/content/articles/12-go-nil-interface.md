---
date: 2022-06-29
title: Go Traps - nil interfaces
description: Avoid runtime errors caused by nil interfaces in Go
cover: https://miro.medium.com/max/700/1*t5KNabwstG5jM4DuB3N7rQ.webp
categories:
  - tech
tags:
  - go
  - interfaces
  - nil
  - panic
toc: true
---

#Go is one of the #programming languages I love the most. But it has its flaws, and nil interfaces are a tricky one.

> After reading this article, you'll never experience runtime errors regarding interfaces

_If you already know a little about interfaces, you can skip to [this section](#The-problem-with-Go-interfaces)._

## What is an interface in Go?

### Definition

In Go, the interface type defines all the other types that should have special behaviour.
For example :

```go
type Speaker interface {
	Say(word string) string
}
```

For example, this struct Person is a Speaker.

```go
type Person struct {
	Name string
}

func (p Person) Say(word string) string {
	return "Hi, " + word
}
```

And so is this Dog.

```go
type Dog struct {
	Age string
}

func (d Dog) Say(word string) string {
	return "Waf, " + word
}
```

So it's very nice because you can use either type in a function.

```go
func greetMichael(s Speaker) {
	fmt.Println(s.Say("Michael"))
}

func main() {
	h := Person{name:"Laurent"}
	greetMichael(h) // Hi, Michael

	d := Dog{age:8}
	greetMichael(d) // Waf, Michael
}
```

Unlike concrete types, you don't have to pass a Speaker type to the `greetMichael` function. **Any concrete type that satisfies Speaker will do!** This is a very elegant form of polymorphism.

In fact, we reverse the dependency : the function does not care about the type, and can be applied to any type that satisfies Speaker (which means having a `Say` method).

For example, you can parse different data types with only one function providing you defined a parsing method for each type.

### Compile-time checks 🔒

You can't assign something of type `T` to an interface `I` if the type `T` doesn't know the methods defined in `I`. It is a **safe** way to make sure nothing breaks at runtime.

```go
type Cat struct {
	Age string
}

func (c Cat) DrinkMilk() string {
	return "Slurp"
}

func main() {
	c := Cat{}
	greetMichael(c)
	// cannot use c (variable of type Cat) as type Speaker in argument to greetMichael: Cat does not implement Speaker (missing Say method)
}
```

### Interface as a type on its own

Passing a concrete type to a function that expects an interface isn't the only way to do. You can also directly pass an interface !

```go
// A concrete type is used to initialize the interface,
// but `i` is of interface type Speaker!
var i Speaker = Person{}
// i.Name isn't available anymore, i is only a Speaker
GreetMichael(i)
```

> But what if I forget to initialize my interface ?

```go
// I only declare my variable without initializing it explicitely
var i Speaker
GreetMichael(i) // ???
```

## The problem with Go interfaces

### Zero values

In Go we have a special thing about initialization: **every** type is initialized at declaration, with _"zero values"_. The empty string `""` for type `string`, `0` for numeral types, and structs are initialized recursively.

### nil interface

Everything is safe and all, but a question emerges:

> What is the zero value of an interface?

The answer is `nil`.
And I love Go, _but that thing, it scares me_.

![It scares me](https://c.tenor.com/hyK63R_vNX8AAAAd/scares-me-i-fear-no-man.gif)

Because you can't `nil.Say()` something. Nil doesn't have any method: it's a `panic`! The code will **crash at runtime**! What's so scary is that any interface can be `nil`, so you have to trust libraries that give interfaces.

From the outside, the problem looks like this:

```go
// ✅ a) OK: A concrete type is passed
p := Person{}
greetMichael(p) // Hi, Michael

// ⚠️ b.1) Risky: An initialized interface is passed
// (a concrete type is used to initialize the interface but `i` is of type Speaker)
var i Speaker = Dog{}
GreetMichael(i) // Waf, Michael

// ❌  b.2) KO: A nil interface is passed
var nilInterface Speaker // nilInterface is equal to `nil`
greetMichael(nilInterface)
// panic: runtime error: invalid memory address or nil pointer dereference
```

> But I'll never pass a nil interface on purpose, right?

You'll do, involuntarily. It's a common mistake, and it's not your fault. It's because of the way Go initializes variables at declaration. If you don't initialize an interface, it will be `nil` by default.

```go
type myStruct struct {
	name string
	speaker Speaker
}

func main() {
	m := myStruct{name: "Ewen"}
  // same as  m := myStruct{name: "Ewen", speaker: nil}
	m.speaker.Say(m.name) // panic, nil dereferencing
}
```

In this example, `myStruct.speaker` is of interface type `Speaker`.
So because it is not initialized in the struct declaration, its default value is `nil`. There is no error at compilation time, but a runtime error when you call `m.speaker.Say(m.name)`.

To sum up, an interface is either:

- Something that has the desired behavior (either a concrete type or a non-nil interface)
- nil (and this can be a serious issue)

## Solutions

### Nil-check before use (if the zero value is useful)

This assumes the interface can be nil. This is a way to do that I don't like because it would induce that all interfaces need a nil check before use. Also, this can become very heavy to maintain in real-world code.

```go
func GreetMichael(s Speaker) {
	if s != nil {
		fmt.Println(s.Say("Michael"))
	}
}
```

> Make the zero value useful

... is one of the official [Go Proverbs](https://go-proverbs.github.io). Sometimes, **nil can be useful** instead of a pain.

For example, in Go, an error is simply an interface!

```go
type error interface {
	Error() string
}
```

So the `nil` value shows the absence of an error somewhere an error could have occurred.
This is a case where nil-checks are acceptable.
But you'll still need to be sure that the error exists before using its `Error()` method.

### Accept Interfaces, pass Concrete Types

From inside the function, you'll never know if the function was called with an interface or a concrete type. So you can act on the function calls.

You shouldn't pass an interface to a function, but rather **always pass a concrete type that satisfies the interface**! This way, the interface cannot be `nil`, because the concrete value always implements the interface.

This way, you never really use interfaces except in the scope of the function it is needed. A [linter](https://github.com/butuzov/ireturn) has been created to enforce a similar behavior. This linter verifies that your functions never return an interface. This way, you always get concrete types when calling functions. By only manipulating concrete types, you can be sure that you'll never have a nil dereferencing.

## Thanks for reading!

I hope you learned some ways to deal with nil interfaces, and pick your strategy according to your needs!

To sum up:

- if the zero value is useful, **nil checks** are acceptable
- otherwise, use the linter to make sure you'll **only pass concrete types** to functions that accept interfaces
