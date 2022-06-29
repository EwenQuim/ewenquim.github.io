# Go
[[Go]] is one of the [[programming languages]] I love the most
## Traps
### Zero values
In Go we have a special thing about initialization: **every** type is initialized at declaration, with *"zero values"*. The empty string `""` for `string`, `0` for numeral types, and structs are initialized recursively.

### Empty interface
In Go, the interface type define all the other types that should have a special behaviour.
For example :

```go
type Speaker interface {
	Say(word string) string
}
```

For example, this struct Person is a Speaker

```go
type Person struct {
	Name string
}

func (p Person) Say(word string) string {
	return "Hi, " + word
}
```

And so is this Dog

```go
type Dog struct {
	Age string
}

func (d Dog) Say(word string) string {
	return "Waf, " + word
}
- [ ] ```

So it's very nice, because you can use either type in a function

```go
func GreetMichael(s Speaker) {
	fmt.Println(s.Say("Michael"))
}
```

The dog will say "Waf, Michael", and the human "Hi, Michael", and it will compile event if Dog and Human are different types.

Also, you can't assign something of type `T` to an interface `I` if the type `T` doesn't know the methods defined in `I`.

Everything is safe and all but a question emerges: 

> What is the nil value of an interface ?

The answer is `nil`.
And I love Go, but this thing, it scares me.
Because you can't nil.Speak() something: it's a panic ! The code will crash.

An interface either:
- Somethings that have the desired output
- nil

So, every interface should be nil-checked before use

```go
func GreetMichael(s Speaker) {
	if s != nil {
		fmt.Println(s.Say("Michael"))
	}
}
```
