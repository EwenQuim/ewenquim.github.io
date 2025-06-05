---
date: 2024-12-06
title: "Templ vs Gomponents: Choosing the Right Go Template Library"
description: "A comprehensive comparison of Templ and Gomponents, two popular Go template libraries that offer type-safety and component composition as alternatives to html/template"
heroImage: /templ-vs-gomponents.webp
categories:
  - tech
tags:
  - Go
  - Templates
  - Web Development
  - Templ
  - Gomponents
toc: true
---

Go's standard `html/template` library is widely used but comes with several limitations that both [Templ](https://github.com/a-h/templ) and [Gomponents](https://github.com/maragudk/gomponents) address. A friend once described them as "_the JSX for Go_". These two popular UI libraries offer:

- **Type-Safety**: Ensuring that arguments adhere to specific types.
- **Template Composition**: Type-safe, discoverable, and flexible components.
- **Direct Go Interoperability**: Allowing direct insertion of Go code into templates without the need for clunky ["template functions"](https://pkg.go.dev/text/template#FuncMap).

With both libraries offering similar strengths, the real question is: **which one should you choose?**

> Shameless Ad: Choose [Fuego](https://github.com/go-fuego/fuego) for your next API ! **Automatic OpenAPI generation**, serialization, validation, error handling, templ & gomponents native support…

## To sum up

Both libraries are great alternatives to `html/template` that we don't recommend anymore. For me, Gomponents wins for its simplicity, _no-build_ philosophy and future-proof design. For my team, Templ wins with its regular improvements and JSX look. (In both case, Go community is winning. Please keep fighting, we love that.)

| Criteria                                  | [Templ](https://github.com/a-h/templ) | [Gomponents](https://github.com/maragudk/gomponents) | [`html/template`](https://pkg.go.dev/text/template) |
| ----------------------------------------- | ------------------------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| [Maturity](#maturity)                     | ⭐️⭐️                                | ⭐️⭐️⭐️                                            | ⭐️⭐️⭐️                                           |
| [Integration to HTML tools](#integration) | ⭐️⭐️                                | ⭐️                                                  | ⭐️⭐️⭐️                                           |
| [Data Safety](#data-safety)               | ⭐️⭐️⭐️                             | ⭐️⭐️⭐️                                            | ⭐️                                                 |
| [Ease of use](#ease-of-use)               | ⭐️⭐️                                | ⭐️⭐️⭐️                                            | ⭐️                                                 |
| [Popularity](#popularity)                 | ⭐️⭐️⭐️                             | ⭐️⭐️                                               | ⭐️⭐️⭐️                                           |
| [Runtime Performance](#performance)       | ⭐️⭐️⭐️                             | ⭐️⭐️⭐️                                            | ⭐️⭐️⭐️                                           |
| **Overall**                               | ⭐️⭐️⭐️                             | ⭐️⭐️⭐️                                            | ⭐️                                                 |

## Maturity

**Gomponents is a library**, elegant and very powerful, with the ability to write custom elements & attributes. Because it's just a Go library that writes `<div` when using the user writes `Div(...)`, it is very stable and future-proof.

```go
// Gomponents - A component is just a Go function!
func Home(args HomeArgs) g.Node {
	return Div(
		g.Text(args.name),
		Span(g.Text(fmt.Sprintf("%d", props.age)),)
	)
}
```

**Templ is a compiler and a LSP** that transforms `.templ` files (that are hybrid between Go and HTML) into Gomponents-like functions. Because it's a compiler, it supports powerful transformations. For example, there is this syntactic sugar with the automatic injection of `context.Context` into components. The LSP is known to not be 100% stable (although it is very advanced right now), it does not always locate errors well and also depends of the community effort. I bet that fuzzing might be able to create unstable inputs for the templ command. In 1-2 years, it might be stable and more powerful that Gomponents, but I feel it's not quite there yet.

```go
// Templ - Templates have a special .templ syntax
type EditNotePageProps struct {
	Note    components.NoteProps
	Notes   []store.Note // The notes containing tags to display in the sidebar
	CanEdit bool         // Whether the user can edit the note
}

templ EditNotePage(props EditNotePageProps) {
	@page(PageProps{
		Title:        "Nuage | " + props.Note.Note.User + "'s notes",
		RelatedNotes: props.Notes,
		IsEditing:    true,
	}) {
		@components.Toolbar(components.ToolbarProps{
			Note:      props.Note,
			IsEditing: true,
			CanEdit:   props.CanEdit,
		})
		<form
			x-data={ fmt.Sprintf(`{
						title: "%s",
						slug: "%s",
						public: %t
					}`, props.Note.Note.Title, props.Note.Note.Slug, props.Note.Note.Public) }
			class="flex flex-col gap-2 mt-2"
			method="POST"
			hx-boost="true"
			hx-trigger="change delay:300ms, keyup delay:300ms"
			action={ templ.SafeURL("/notes/" + props.Note.Note.User + "/" + props.Note.Note.ID + "/edit") }
		>
```

Side note: Both tools support the "method rendering" pattern, meaning that you can define a type that will be able to render, a little like Charm's [Bubble Tea](https://github.com/charmbracelet/bubbletea) rendering principle for TUIs. This pattern is not very popular yet but I expect it to be used more and more often.

## Integration

Gomponents being a library, we only work with `.go` files. It's up to you to create your own `templates/` folder and organize your files. Also, IDE extensions and tools that works with HTML syntax will not work with Gomponents, or require additional configuration that might mess with the other .go files (like for the tailwind extension for example). This is **the** big pain with this tool.

It is almost the same thing with Templ except that it's restricted to `.templ` files. Also, the syntax is more Go-in-HTML than HTML-from-Go, which can be easier to read and to integrate.

Second major pain point for Gomponents: having a HTML-from-Go approach, **lisibility** is reduced compared to Templ. Templ components are really pleasant to read.

But one thing I love with gomponents is this little "closure" before returning components that [isn't very pleasant to use in Templ](https://templ.guide/syntax-and-usage/raw-go).

```go
func Home(args HomeArgs) g.Node {
	if args.age < 0 {
		args.age = 0
	}
	return Div(
		g.Text(args.name),
		Span(g.Text(fmt.Sprintf("%d", props.age)),)
	)
}
```

## Data Safety

Both libs accomplish Data Safety through Go Typing. When I speak about Data Safety, it's about sending correct data to the template and check it at compile time.

Gomponents do it via simple Go typing. Because Gomponents are simply Go functions, they are safe because Go is safe.

```go
type HomeArgs struct {
	name string
	age int
}

// Component usage
func myController(c fuego.ContextNoBody) (fuego.Renderer, error) {
  return Home(HomeArgs{
		name: "Ewen",
		age: 25,
	}), nil
}
```

Templ have the same input syntax.

Minus one to both libs because when you pass a struct, you can always forget to add a field (an unfortunate Go feature).

```go
return Home(HomeArgs{
	age: 18,
	// I forgot to pass Name! No warning or error from Go compiler
})
```

## Ease of use

Gomponents requires no build steps—components are directly usable, creating a smooth developer experience that integrates well with hot-reloading tools.

Templ will always need this extra compilation step. Currently compilation is uber fast (~40ms for my 30+ templates project) but it still _needs_ to be triggered manually or integrated in your build chain (with `go generate` for exemple).

`html/template` needs runtime compilation and rely on a filesystem. Even though the filesystem can be virtualized and templates can be embed in the binary with the `embed` package, it's still a pain to have to manage manually template compilation. Also, the fact that functions must be inserted using a funcMap with a weird syntax is a _no-Go_ for me.

## Popularity

[![Star History Chart](https://api.star-history.com/svg?repos=a-h/templ,maragudk/gomponents&type=Date)](https://star-history.com/#a-h/templ&maragudk/gomponents&Date)

Keep in mind that it is dumb to compare libraries using Github stars. One had the spotlight of a famous Twitch streamer (guess when) while the other one haven't. Also, popularity leads to popularity. That's why I'm trying to bring the discussion around templ vs gomponents with this article.

## Performance

I/O being the main bottleneck as always, runtime performance only depends on writing speed. Additional computing made by both librairies isn't significant compared to writing speed.

Templ and Gomponents are writing on an `io.Writer` interface using the std Go capabilities over this interface. So their speed only depends on the underlying type that satisfies this interface (for example, `http.ResponseWriter`) and will be the same for every lib. But Templ, being a compiler, can optimize further these string concatenation and is expected to go faster than Gomponents.

Gomponents and Templ are ~5 to 10x faster than `html/template`, according to [this comment](https://github.com/a-h/templ/discussions/948#discussioncomment-11060242). But a more accurate benchmark would be helpful!

## Happy coding!

Btw, [Fuego](https://github.com/go-fuego/fuego) supports both [Templ](https://go-fuego.github.io/fuego/docs/tutorials/rendering/templ) & [Gomponents](https://go-fuego.github.io/fuego/docs/tutorials/rendering/gomponents), don't hesitate to give it a try! 😉
