// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

import { LinkedList } from "./linkedlist.js";

class Hashmap {
  loadFactor = 0.75;
  capacity = 16;
  map = new Array(this.capacity);

  hash(key) {
    let hashCode = 0;
        
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
  
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if(!this.map.hasOwnProperty(index)) {
      this.map[index] = new LinkedList();
    }   
    let node = this.map[index].head;
    let foundKey = false;
    while(node !== null) {
      if(node.value[0] == key) {
        node.value = [key,value];
        foundKey = true;
      };
      node = node.nextNode;
    }
    if(!foundKey) {
      this.map[index].append([key,value]);
    }
    const loadLevel = this.capacity * this.loadFactor;
    if(this.length() > loadLevel) {
      console.log("current load: " + loadLevel);
      this.capacity = this.capacity * 2;
      console.log("new load: " + loadLevel * 2);
      let entries = this.entries();
      this.map = new Array(this.capacity);
      for(let entry of entries) {
        this.set(entry[0],entry[1]);
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    if(!this.map.hasOwnProperty(index)) {
      return null;
    }
    else {
      let node = this.map[index].head;
      while(node !== null) {
        if(node.value[0] == key) {
          return node.value[1];
        };
        node = node.nextNode;
      }
      return null;
    }
  }

  has(key) {
    let value = this.get(key);
    if(value === null) {
      return false;
    }
    else {
      return true;
    }
  }

  remove(key) {
    const index = this.hash(key);
    if(!this.map.hasOwnProperty(index)) {
      return false;
    }
    else {
      let node = this.map[index].head;
      let foundNodeIndex = 0;
      while(node !== null) {
        if(node.value[0] == key) {
          this.map[index].removeAt(foundNodeIndex);
          return true;
        };
        node = node.nextNode;
        foundNodeIndex++;
      }
      return false;
    }
  }

  length() {
    let length = 0;
    for(let i = 0; i < this.map.length; i++) {
      if(this.map.hasOwnProperty(i)) {
        let node = this.map[i].head;
        while(node !== null) {
          length++;
          node = node.nextNode;
        }
      }
    }
    return length;
  }

  clear() {
    this.map = new Array(this.capacity);
  }

  keys() {
    let keys = [];
    for(let i = 0; i < this.map.length; i++) {
      if(this.map.hasOwnProperty(i)) {
        let node = this.map[i].head;
        while(node !== null) {
          keys.push(node.value[0]);
          node = node.nextNode;
        }
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for(let i = 0; i < this.map.length; i++) {
      if(this.map.hasOwnProperty(i)) {
        let node = this.map[i].head;
        while(node !== null) {
          values.push(node.value[1]);
          node = node.nextNode;
        }
      }
    }
    return values;   
  }

  entries() {
    let entries = [];
    for(let i = 0; i < this.map.length; i++) {
      if(this.map.hasOwnProperty(i)) {
        let node = this.map[i].head;
        while(node !== null) {
          entries.push(node.value);
          node = node.nextNode;
        }
      }
    }
    return entries;       
  }
}

const test = new Hashmap();
test.set('apple', 'red');
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log("Before")
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.set('apple', 'green');

console.log("After")
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

test.set('moon','silver');
console.log("should be scrambled");
console.log(test.get('moon'));
console.log(test.has('moon'));
console.log(test.remove('moon'));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

test.clear();

console.log(test.entries());

