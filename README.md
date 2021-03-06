<div align="center">
  <img alt="header" src="https://raw.githubusercontent.com/dotmind/rn-shadow-generator/master/examples/header.jpg" />
</div>
<h1 align="center">
  @dotmind/rn-shadow-generator
</h1>
<p align="center">
  React Native Shadow Generator to quickly generate shadow of your components. Builded by <a href="https://dotmind.io/" target="_blank">.mind.io</a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@dotmind/rn-shadow-generator">
    <img src="https://img.shields.io/npm/v/@dotmind/rn-shadow-generator" />
  </a>
  <a href="https://www.npmjs.com/package/@dotmind/rn-shadow-generator">
    <img src="https://img.shields.io/npm/dw/@dotmind/rn-shadow-generator" />
  </a>
  <a href="https://codecov.io/gh/dotmind/rn-shadow-generator">
    <img src="https://codecov.io/gh/dotmind/rn-shadow-generator/branch/master/graph/badge.svg?token=FBX6GCYOQF"/>
  </a>
  <a href="https://github.com/dotmind/rn-shadow-generator">
    <img src="https://img.shields.io/github/license/dotmind/rn-shadow-generator" />
  </a>
  <a href="https://github.com/dotmind/rn-shadow-generator">
    <img src="https://img.shields.io/npm/types/typescript" />
  </a>
</p>

## Menu

- [Menu](#menu)
- [๐ Roadmap](#-roadmap)
- [๐ Preview](#-preview)
- [๐ป Installation](#-installation)
- [๐ทโโ๏ธ How it's work](#๏ธ-how-its-work)
  - [ShadowView usage](#shadowview-usage)
  - [generateShadow usage](#generateshadow-usage)
- [๐งช Example app](#-example-app)
- [โก๏ธ Contributing](#๏ธ-contributing)
- [๐ License](#-license)

## ๐ Roadmap

* [ ] Android full compatibility (shadowOffset support)


## ๐ Preview

![preview](https://raw.githubusercontent.com/dotmind/rn-shadow-generator/master/examples/preview.png)

## ๐ป Installation

```bash
yarn add @dotmind/rn-shadow-generator
```

or

```bash
npm i @dotmind/rn-shadow-generator --save
```

## ๐ทโโ๏ธ How it's work

### ShadowView usage

```javascript
import { ShadowView } from '@dotmind/rn-shadow-generator';

const BasicComponent = () =>ย {
  return (
    <ShadowView>
      <Text>My Shadow View</Text>
    </ShadowView>
  );
}

const MyCustomComponent = () =>ย {
  return (
    <ShadowView level={4} shadowColor={'#000'} direction={'bottom'}>
      <Text>My Shadow View</Text>
    </ShadowView>
  );
}

```

| props | description | required | default value |
|-|-|-|-|
| level | Increase shadow dimensions | false | 4 |
| shadowColor | Change shadowColor style attribute | false | #000 |
| direction | Change shadow direction | false | bottom |

### generateShadow usage

Returns a full shadow object depending on OS (iOS or Android).

```javascript
import { generateShadow } from '@dotmind/rn-shadow-generator';

const BasicComponent = () =>ย {
  return (
    <View style={{ ...generateShadow() }}>
      <Text>My Shadow View</Text>
    </View>
  );
}

const MyCustomComponent = () =>ย {
  return (
    <View style={{ ...generateShadow({ level: 4, shadowColor: '#000', direction: 'bottom' }) }}>
      <Text>My Shadow View</Text>
    </View>
  );
}

```

| attributes | description | required | default value |
|-|-|-|-|
| level | Increase shadow dimensions | false | 4 |
| shadowColor | Change shadowColor style attribute | false | #000 |
| direction | Change shadow direction | false | bottom |

**Object returned**

```javascript
{
  ...Platform.select({
    ios: {
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
    },
    android: {
      shadowColor,
      elevation: level,
    },
  }),
}
```

## ๐งช Example app

To see full app integration example please [refer to here](./examples/ShadowExampleApp/App.tsx).

> โ ๏ธ To run the app please run here `yarn build` that the @dotmind/rn-shadow-generator npm package be able to link itselfs.
## โก๏ธ Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## ๐ License

[MIT](https://choosealicense.com/licenses/mit/)
