Introduction to GraphQL
=======================

Demo code for my "Graphql" tack at [OpenFest](http://www.openfest.org/2015/bg/programa/)

### Slides

[Speaker Deck](https://speakerdeck.com/rstankov/introduction-to-graphql)

### Installation

```
gem install bundler
bundle install
rake db:create
rake db:migrate
rake db:seed
```

### Usage

```
rails server
open http://localhost:3000
```

### Sample queries

```
query {
  users {
    id
    name
  }
}
```

```
query {
  user(id: 1) {
    id
    name
    posts {
      id
      title
    }
  }
}
```


```
query {
  post(id: 1) {
    id
    title
    tagline
    makers {
      id
      name
      posts {
        id
        title
      }
    }
  }
}
```
