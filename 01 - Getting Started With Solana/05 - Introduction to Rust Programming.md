[Introduction to Rust Programming - Calyptus](https://calyptus.co/lessons/introduction-to-rust-programming/)

# Introduction to Rust Programming

##### October 10, 2023

**Why Rust?**

Rust is one of the fastest growing programming languages in the world with over 2.8 million Rust developers globally – that’s almost 10% of the software developer population! But what’s the reason developers are flocking in droves to this magical language? In this module, we’ll unpack Rust’s awesome properties and why you should be joining the club.  
  
Let’s begin.

**Rust’s Winning Characteristics**

There are many characteristics that have made Rust so popular but for us, there are three killer reasons that we think have made the language what it is today.  
  
**1. Memory Safety and Zero-cost Abstractions**

Rust’s ownership model and borrow checker ensure memory safety at compile time, preventing common bugs like null pointer dereferences and data races. At the same time, Rust is able to achieve high performance through zero-cost abstractions, allowing developers to write code that is both safe and fast!

**2. Concurrent and Safe Multithreading**

Rust’s ownership system enables developers to write concurrent code with confidence. It’s system prevents data races at compile time which means Rust is able to eliminate a whole class of difficult-to-debug concurrency issues that plague other languages. As a relatively new language, forming in 2013, it has managed to learn from its predecessors’ pain points.

**3. Ergonomics and Developer Experience**

Rust is designed to be developer-friendly, with a clear and expressive syntax. The language’s package manager, Cargo, simplifies dependency management and project setup. This focus on ergonomics makes Rust more approachable for developers coming from other languages (just like you and all our amazing tech professionals in the Calyptus Community!)

Overall, these winning factors combined with a vibrant developer community has contributed significantly to Rust’s rapid growth and adoption among developers and organisations alike. The language was born to address critical pain points from legacy languages and thus it’s become a highly attractive option for a wide range of applications.

**Installing Rust**

If this is your first time installing Rust, make sure to follow the instructions outlined in our previous lesson: **Setting Up Your Local Environment** to do so.

Installing Rust VS Code extensions is also advised [here](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).

This tool essentially offers code completion with automatic import insertion, enabling programmers to write code faster and with fewer errors. Additionally, developers can navigate through their codebase efficiently with functionalities like “go to definition,” “implementation,” and “type definition.”

**Cargo**

Cargo is the package manager and build system for the Rust programming language. It is an integral part of the Rust ecosystem and is included with the Rust installation. Cargo provides developers with a unified and streamlined experience for managing dependencies, building, testing, and deploying Rust projects.

If you are a JavaScript Dev then you might be familiar with NPM. Well, Cargo does the same job as NPM for Rust.

So similar to `npm init`, we have a cargo command to start a new Rust project. Let’s run it…

```bash
cargo new hello_calyptus

```

![](https://lh5.googleusercontent.com/Yx2Nl5ZGXjh4ThXpsrdstQqNqpYYVC4VoU016ph4mz-CRi5Hs0zexXW3ckuM-ekrmWUsNjvnWmCEpCJ0rwCuubvQfdkJ3kytsqFrv_zw_z0jdlb8OtfLrty7EDP6rssSnUtqbGMK5Mq3GDfzv3liiH8)

As you can see, it will create a simple hello world program. Let’s go through some files which it created:

- main.rs ⇒ Where your code will exist
- Cargo.toml⇒ Where you can list additional packages you need for your code. Similar to package.json

Some commands:

- Building the code: `cargo build`
- Compile the code and execute it: `cargo run`

Now let’s go through some concepts that should be very simple if you are already familiar with programming.

**Variables and simple printing**

Check out the code below…

![](https://lh6.googleusercontent.com/N3TIvtj7bChM6mmal5mDP6r9cSBVEmcIy9ctMrWTz_Cf1v7Bf5_QGpOD7lbPCBGyGikfh_HfTiOlJMNWeQcPC6oeIk6v-1rds_dGd74NpksTpSSr7EdVDIyXp-juIqQcM915FZjaS17X6wJBOCS6H90)

See that the Rust analyser adds the data type by itself. Now let’s go through some variable types…

**Datatypes**

Starting with numbers…

![](https://lh5.googleusercontent.com/AR-2vDu-7-gOEWcIYixLU_ANXyWOIsMpQe6sdME-znAlDIhxUqJ6sm48X30E3GxIdWOmNdp8wYlz2JBCFpOD0TAYNkZP_OPRXY3sQyETr2KvCpe9Um0GSBoDtar3leFLNxrUkvpmldeIQuYVV1t7Wfw)

There are multiple data types to play with numbers in Rust. Whilst writing the smart contracts one should be careful about how much space would be required for the variables, as this helps.  
We should always aim to write a smart contract that is very precise.

- **unsigned:** Unsigned variants can store numbers from 0 to 2^n – 1, so a u8 can store numbers from 0 to 2^8 – 1, which equals 0 to 255.
- **signed:** Each signed variant can store numbers from -(2^(n – 1)) to 2^(n – 1) – 1 inclusive, where n is the number of bits that variant uses. So an i8 can store numbers from -(2^7) to 2^7 – 1, which equals -128 to 127.
- **float:** Rust’s floating-point types are f32 and f64, which are 32 bits and 64 bits in size, respectively. The default type is f64 because on modern CPUs, it’s roughly the same speed as f32 but is capable of more precision. All floating-point types are signed.  
[f32 - Rust](https://doc.rust-lang.org/std/primitive.f32.html)

Let’s check out some more datatypes. 

![](https://lh5.googleusercontent.com/41BKA-c9zyoZoW6GN0S2jMrStnWvlmR58XZKgvQRNE_G1Oqu9VuBDOlVbg2X3vM0fmBTvbcVvQJvUXqBDWXzgzhJEnXi3rwOEkhXKXTUuXu1A3PukrAUnx2bqsrULMRooqtZHB4z_-fgZcx_QgZQCac)

These data types (**char, boolean, tuple**) should also be simple to understand if you already know any other programming language!

In Rust, the **`Debug`** trait enables the printing of a data structure’s content using the `{:?}` formatting specifier. It allows developers to easily inspect and display the values of variables and custom data types during debugging, aiding in the identification and resolution of issues in the code.

![](https://lh6.googleusercontent.com/PZPrhg_LwSqFU_4rh6JuitWnFwHiIPvHShBIn_VtUTtTlC3cw5UQudbJrBHmGYvms0tVMKBJNShYNBwKnYxeRV37cNee2sCTGxrj81dCqQbPZRA5eatXn3Rvc7Jqw6Jqr8PgOxMHPcFYomDWKgwOFSc)

We also have **array, string, vector and hash map**. The comments would help you to learn quickly here. Try writing down the code, compiling it and getting to grips with it. Each data type has its own unique functions, and there are many functions. Our recommendation? Jump right in and get tinkering to explore them all !

Before you dive in, it’s worth noting that there are some key differences between Arrays and Vectors:


| **Arrays**                                                                                                               | **Vectors**                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Arrays in Rust have a fixed size determined at compile time.                                                             | Vectors, represented by the Vec<T>type, are dynamic arrays that can grow or shrink at runtime.                           |
| Elements in an array have the same type, and the length is part of the array’s type signature.                           | Vectors can store elements of different types, as they utilise Rust’s generic type system.                               |
| Arrays are allocated on the stack, making them more memory efficient and generally faster to access compared to vectors. | Vectors are allocated on the heap, allowing them to have a flexible size.                                                |
| The mut keyword can be used to declare a mutable array, allowing modifications to its elements.                          | The mut keyword can be used with vectors to declare mutable vectors and modify their elements.                           |
| However, arrays cannot be dynamically resized once created. Their size is static and cannot be changed during runtime.   | Vectors provide additional methods and functionality not available with arrays, such as push, pop, and dynamic resizing. |
 

To summarise, arrays have a fixed size determined at compile time and are more memory-efficient and faster to access. Vectors, on the other hand, are dynamic arrays that can grow or shrink at runtime and provide additional functionality. If you need a collection that can change its size during runtime, vectors are generally the preferred choice.

##### **Hashmap**

**`std::collections::HashMap::new`** is a method that creates a new instance of the HashMap data structure from the standard library’s collections module.

Here’s what the components of `std::collections::HashMap::new` represent:

- **std::collections**: This is the module in the Rust standard library that contains various collection types, including the HashMap.
- **HashMap**: This is the specific collection type. A HashMap is an unordered collection of key-value pairs, where each key is unique.
- **new**: This is a method associated with the HashMap type. By calling new, you create a new, empty HashMap instance.

When you invoke `std::collections::HashMap::new`, you create a new HashMap object that has no key-value pairs initially. You can then use methods such as insert, get, and remove to add, retrieve, or remove elements from the HashMap.

##### **Struct**

**Struct** (short for structure) is a custom data type that allows you to define your own composite data structure by grouping multiple related values together. Structs are similar to classes in other programming languages and are a fundamental building block for defining complex data structures and organising data in Rust programs. To define a struct in Rust, you use the struct keyword followed by the name of the struct and a block of curly braces {}. Inside the curly braces, you declare the fields of the struct, specifying their names and types. Here’s an example of a simple struct representing a 2D point:

```rust
struct Point { 
  x: f64, 
  y: f64, 
}
```

##### **Enums**

**Enums** are a custom data type that allows you to define a type by enumerating its possible variant values. Enums are useful to represent data that can have different forms while still maintaining a clear type definition.

![](https://lh4.googleusercontent.com/2fS8ki-i_rkYqGNBqPfY5i4SYL3FWotsOgarQqQgRVZNeGW2V5sKHm4cZWgydn4KTxounOkKSFERgKT2tZ9AxXruxlAGPALSjRmKZVYl1fPysInOZr2ATMS-ezipOZsQHB-dzmIvwxQiTYRbsJarRIk)

**Mutability in Rust**

In Rust, **mutability** is the concept that determines whether a value is mutable (can be changed) or immutable (cannot be changed after it is created). By default, all values in Rust are immutable to encourage safety and optimise performance. You must explicitly request mutability to change a value.

Mutability in Rust is managed through various language features, such as variables, references, and writable structs:

- **Variables**: When you declare a variable using the let keyword, the variable is immutable by default. To create a mutable variable, use the _mut_ keyword: let x = 5; // immutable variable let mut y = 5; // mutable variable  
    
- **References**: Rust has two types of references, known as borrowing: mutable references and immutable references. Borrowing resolves conflicting access and avoids data races. This will get clearer as we get into coding.  
    
- **Immutable reference**: Created with &T and allows read-only access to data. Multiple immutable references can exist simultaneously but cannot coexist with mutable references.  
    
- **Mutable reference**: Created with &mut T and allows read-write access to the data. Only one mutable reference can exist at a time, ensuring data integrity and avoiding data races. let mut x = 5; let y = &x; // immutable reference let z = &mut x; // mutable reference

To summarise, Rust’s mutability management promotes data consistency, and concurrency control, and eliminates data races, helping you write more robust and efficient programs.

Remember, when using mutable variables, references and structs, you must explicitly request mutability with the _mut_ keyword.

#### **Loops**

We also have fairly similar types of loops as we have in other programming languages but let’s have a look at the syntax. There are 3 types of loops in Rust.

- **loop**: It is an infinite loop that keeps executing the enclosed block of code until an explicit break statement is encountered or a condition to stop is met. This type of loop is suitable when you are unsure about the number of iterations or when you need to repeat a task indefinitely.

![](https://lh6.googleusercontent.com/d1rgZk22J5wh02ofUA7kfiTuZGN0_2zJER-gGX4Nqlmjwr-nkJZM_7smBCeLge3VXQv0nUl3KggZ1g-WzzExzzBBGbzZ3QpW0ucp0PyF9E9_CgGG0l1OZB7D7v-xiGH7ExAcCJ6P63KkvTMl1wBugZM)

- **while**: The while loop evaluates a condition before executing the loop body. If the condition is true, the loop body will be executed. The loop keeps iterating as long as the condition is true. If the condition is false from the beginning, the loop body will never execute.

![](https://lh4.googleusercontent.com/1xcXrAwD0kfxGV1SDMQyqGO6pOwu_ip7ABqtdesAIadVDcT0IcHNtAvIAanTOZghHKfs2roucl6UwcPJp98M7RMFxGZ5IuZjhNz-MqTALPYy40UPY35dH8MuL7tn7WMvK0-GyShCjNlTffnTD5EqhEA)

- **for**: The for loop in Rust is designed for iterating over elements in a collection or a range, such as arrays, vectors, or iterators. The loop executes a block for each element in the collection and implicitly handles the termination condition.

![](https://lh5.googleusercontent.com/eRYF1yBDhpciU4E149AWH-fFXHNXKa9YyLdy48_klqI8lbH20V0pxO41hjb8gF4lv0sDWSwaBb1BGZvTn0gGbdHxt8uduJRVe9CW0d8TcW4IyfVzxRq1_-JV_xWBZdNCHE0Xohv7lgNdsa9uXyu512c)

Looping over an array and an iterator…

![](https://lh5.googleusercontent.com/X_IihgGzh-UY__MqAsF2RQx8LK_Ltj0wA7U3V_398Rwirt2QflGNbE9Icgq6z_13VvPGOk89FTVcOdRLFrL__Ae6xizTUXvG0qeQV4rg9nCjaKGA4_OyE086cim56gvPi8ht40r4zbx38NmZeVswnlc)

#### **Match**

Rust has an extremely powerful control flow construct called match that allows you to compare a value against a series of patterns and then execute code based on which pattern matches.

The match control flow construct in Rust is similar to a switch statement in other languages with some additional powerful features. It allows you to compare a value against a series of patterns, where each pattern is followed by code to be run if the pattern matches the value. Pattern matching in Rust is exhaustive, which means that you must cover all cases, or the code will not compile. Here’s the syntax:
```rust
match value { 
    
    pattern =code, 
    
    pattern =code, 
    
    ... 
    
    _ =code, // _ is a catch-all pattern
    
}
```
**Example 1: Basic usage of match**
```rust
let number = 3;

match number { 

  1 =println!("One"), 
  
  2 =println!("Two"), 
  
  3 =println!("Three"), 
  
  4 =println!("Four"), 
  
  5 =println!("Five"), 
  
  _ =println!("It's something else"),
  
}
```
…In this case, “Three” will be printed.

**Example 2: Match with complex data structures**

```rust
enum Color { 

  Red, 
  
  Green, 
  
  Blue, 
  
  RGB(u8, u8, u8), // tuple struct variant
  
}

let color = Color::RGB(0, 0, 255);

match color { 

  Color::Red =println!("Red"), 
  
  Color::Green =println!("Green"), 
  
  Color::Blue =println!("Blue"), 
  
  Color::RGB(r, g, b) =println!("RGB: {}, {}, {}", r, g, b),
  
  }
```

…In this case, “RGB: 0, 0, 255” will be printed.

**Example 3: Match with range patterns**

```rust
    let number = 5;
    
    match number { 
    
    1..=5 =println!("one through five"),
    
     _ =println!("something else"),
    
    }
```

…In this case, “one through five” will be printed. 

**Example 4: Match with combined conditions**

```rust
    let pair = (0, -2);
    
    match pair { (0, y) =println!("First is 0 and y is {:?}", y), (x, 0) =println!("x is {:?} and last is 0", x), _ =println!("It doesn't matter what they are"),
    
    }
```

…In this case, “First is 0 and y is -2” will be printed.

The \_ pattern is used for handling all remaining values. If \_ wasn’t present and the match expression doesn’t handle all possible values, then the code would not compile. This feature prevents us from forgetting to handle a case.

These are just a few examples of how to use the match statement in Rust. The full power of match comes with using complex patterns, destructuring, guard clauses, and @ bindings, among other features.

Resources: [https://doc.rust-lang.org/rust-by-example/flow\_control/match.html](https://doc.rust-lang.org/rust-by-example/flow_control/match.html)

#### **Functions**

Functions are logical blocks of code in Rust. They wrap reusable pieces of logic that can be used at different points in your code. It is a way to structure your program into sub-programs that perform specific tasks.

Here’s the syntax:

```rust
    fn function_name(parameter_list) -return_type {
    
    // code
    
    }
```

- fn: Defines the function.
- function\_name: The name of the function.
- parameter\_list: Parameters for the function enclosed within parentheses. Multiple parameters are separated by a comma.
- \-return\_type: Defines the return type of the function.
- {..}: The function body enclosed within braces.

**Examples**:  
  
**1. Defining a function**

```rust
    fn print_greeting() {
    
    println!("Hello, world!");
    
    }
    
    // Call the function
    
    print_greeting();
```

**2. Defining a function with a single parameter:**

```rust
    fn print_number(n: i32) {
    
    println!("The number is {}", n);
    
    }
    
    // Call the function
    
    print_number(5);
```

**3. Defining a function with multiple parameters:**

```rust
    fn print_numbers(x: i32, y: i32) {
    
    println!("The numbers are {} and {}", x, y);
    
    }
    
    // Call the function
    
    print_numbers(5, 10);
```

**3. Defining a function with a return type:**

```rust
    fn add(x: i32, y: i32) -i32 {
    
    x + y // No semicolon since it is a return expression
    
    }
    
    // Call the function
    
    let sum = add(5, 10);
    
    println!("The sum is {}", sum);
```

**4. Defining a function with a return type and explicit return statement:**

```rust
    fn subtract(x: i32, y: i32) -i32 {
    
    return x - y;
    
    }
    
    // Call the function
    
    let difference = subtract(10, 5);
    
    println!("The difference is {}", difference);
```

Rest assured, Rust also supports various features like generic functions, higher-order functions, and much more when it comes to functions.

Resource: [https://doc.rust-lang.org/rust-by-example/fn.html](https://doc.rust-lang.org/rust-by-example/fn.html)

**Implementation**

In Rust, **impl** keyword is used for implementing methods related to a specific struct or enum. These implementations can be thought of as defining a set of behaviours for a particular type.

The general syntax for impl is:

```rust
    struct StructName {
    
    // fields
    
    }
    
    impl StructName {
    
    // methods
    
    }
```

**1. Basic Implementation:**

```rust
    struct Rectangle { width: u32, height: u32,
    
    }
    
    impl Rectangle { fn area(&self) -u32 { self.width * self.height }
    
    }
    
    let rect = Rectangle { width: 30, height: 50 };
    
    println!("The area of the rectangle is {}", rect.area());
```

In this example above, Rectangle struct is defined with width and height fields. We then add an area() method to the struct via the impl keyword. The &self keyword refers to the instance of Rectangle, similar to this in other languages.

**2. Implementation with more than one method:**

```rust
    struct Circle {
    
        radius: f64,
    
    }
    
    impl Circle {
    
        fn area(&self) -f64 {
    
            3.14 * (self.radius * self.radius)
    
        }
    
        fn perimeter(&self) -f64 {
    
            2.0 * 3.14 * self.radius
    
        }
    
    }
    
    let circle = Circle { radius: 10.0 };
    
    println!("The area of the circle is {}", circle.area());
    
    println!("The perimeter of the circle is {}", circle.perimeter());
```

In this example, two methods are defined for Circle struct using impl keyword: area() and perimeter().

**3. impl can also be used for implementing traits, which are defined using the trait keyword.** 

Traits are a way to define behaviour that can be shared across multiple types:

```rust
    trait HasArea { fn area(&self) -f64;
    
    }
    
    struct Square { side: f64,
    
    }
    
    impl HasArea for Square { fn area(&self) -f64 { self.side * self.side }
    
    }
```

In this example above, we define a HasArea trait with an area() method. We then use impl HasArea for Square to implement this trait for the Square struct. Now, any Square instance will have an area() method.

**Finito!** 

Great job. Well done for completing Rust 101 Theory! This module has provided an overview of Rust, covering its key concepts and features. Rust’s focus on memory safety, ownership, and concurrency makes it a powerful language for writing reliable and efficient code. With its package manager, Cargo, and the distinction between arrays and vectors, Rust offers a streamlined development experience. Armed with this knowledge, you are ready to dive into the world of Rust and leverage its strengths to build robust applications. Let’s get coding!

Git repo: [https://github.com/Calyptus-Learn/rust-101-for-solana](https://github.com/Calyptus-Learn/rust-101-for-solana)

Now you’ve completed the tutorial we encourage you to contribute to this tutorial’s repository. Did you find an error? Have an idea to enhance the content? Want to share additional resources or examples? Your contributions are valuable, and they’ll help improve this tutorial for others. 

**What’s Next?**

- **Submit Pull Requests:** If you have improvements or fixes, please submit a pull request. We welcome your contributions and feedback.
- **Share Your Fork:** We’d love to see how many people are using this tutorial. Please share the link to your forked repository below and on your social media or in developer networks. It’s a great way to show your support and encourage others to learn Solana as well. 
- **Earn Your Trophy:** At the end of the month, we will send you an NFT certificate to your Solana wallet address proving you’ve completed the tutorial. Just put in your Solana wallet address below.