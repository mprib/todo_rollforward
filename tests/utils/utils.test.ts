
// /tests/utils/utils.test.ts

import { arch } from 'os';
import {replaceToDoMarkers, filterList} from 'src_root/utils/utils';

describe('Utils', () => {
  // You can add more test cases
  test('undone items converted to []', () => {
    const result = replaceToDoMarkers(prelimToDo);
    console.log("Preliminary Text")
    console.log(prelimToDo)
    console.log("Result Text after replacing ToDo Markers")
    console.log(result)
    expect(result).toBe(archivedToDo);
  });

  test('create filtered list for new note', () => {
    const result = filterList(prelimToDo);
    console.log("Preliminary Text")
    console.log(prelimToDo)
    console.log("Result Text after filtering done")
    console.log(result)
    // trimming rolledForwardToDo is necessary to get test to pass
    expect(result).toBe(rolledForwardToDo.trim())
  });

});




const prelimToDo = `
# Reflection
This is some preliminary text that would be part of a daily note that I want to ignore.

# Projects
This is some text that is just sitting in here

## [[Thing]]

- [ ] jkjk
- [x] jklj;k
- [x] jklj;k

## Thing 2
- [ ] jkjk
- [x] jklj;k
- [ ] jkjk
- [x] jklj;k


## Thing 3

- [ ] jkjk
- [x] jklj;k
- [ ] jkjk
- [x] jklj;k


# Other stuff

## Don't forget
- [ ] jkjk
- [x] jklj;k
`


const archivedToDo = `
# Reflection
This is some preliminary text that would be part of a daily note that I want to ignore.

# Projects
This is some text that is just sitting in here

## [[Thing]]

- [] jkjk
- [x] jklj;k
- [x] jklj;k

## Thing 2
- [] jkjk
- [x] jklj;k
- [] jkjk
- [x] jklj;k


## Thing 3

- [] jkjk
- [x] jklj;k
- [] jkjk
- [x] jklj;k


# Other stuff

## Don't forget
- [] jkjk
- [x] jklj;k
`

const rolledForwardToDo = `
# Reflection
This is some preliminary text that would be part of a daily note that I want to ignore.

# Projects
This is some text that is just sitting in here

## [[Thing]]

- [ ] jkjk

## Thing 2
- [ ] jkjk
- [ ] jkjk


## Thing 3

- [ ] jkjk
- [ ] jkjk


# Other stuff

## Don't forget
- [ ] jkjk
`