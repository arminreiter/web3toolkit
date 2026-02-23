# Notes

## Url Parameters

- net: allows to set the network via URL param. values are e.g.: eth, eth-test, ecs, Gnosis

## Add new tool to tools

1. generate component:

```bash
ng g c tools/NameOfNewTool --skipTests
```

2. add route to tools-routing.module.ts
3. add tool to: tools.data.ts
