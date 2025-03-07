export class LinkedList {
  head = null;
  tail = null;
  size = 0;

  append(value) {
    const newNode = new Node(value);
    if(this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      let node = this.head;
      while(node.nextNode != null) {
        node = node.nextNode;
      }
      node.nextNode = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if(this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      let node = this.head;
      newNode.nextNode = node;
      this.head = newNode;
    }
    this.size++;
  }

  at(index) {
    let node = this.head;
    for(let i = 0; i < index; i++) {
      node = this.head.nextNode;
    } 
    return node;
  }

  pop() {
    let node = this.head;
    let newTail = this.head;
    if(this.head === this.tail) {
      this.head = null;
      this.tail = null;
      
    } else {
      node = node.nextNode;
      while(node.nextNode != null) {
        newTail = node;
        node = node.nextNode;
      }
      this.tail = newTail;
      newTail.nextNode = null;
    }
    this.size--;
  }

  contains(value) {
    let node = this.head;
    while(node != null) {
      if(node.value === value) {
        return true;
      }
      node = node.nextNode;
    }
    return false;
  }

  find(value) {
    let index = 0;
    let node = this.head;
    while(node != null) {
      if(node.value === value) {
        break;
      }
      node = node.nextNode;
      index++;
    }
    return index;
  }

  toString() {
    if(this.head === null) {
      return "empty list";
    }
    else {
      let str = "";
      let node = this.head;
      str += `( ${node.value} )`;
      while(node.nextNode != null) {
        node = node.nextNode;
        str += ` -> ( ${node.value} )`;
      }
      str += " -> null";
      return str;
    }
  }

  insertAt(value, index) {
    let newNode = new Node(value);
    if(index == 0) {
      if(this.head == this.tail) {
        this.tail = newNode.nextNode;
      }
      newNode.nextNode = this.head;
      this.head = newNode;
    }
    else {
      let node = this.head;
      let prevNode = null;
      for(let i = 0; i < index; i++) {
        prevNode = node;
        node = node.nextNode;
      }
      
      if(prevNode == null) {
        this.head = newNode;
        newNode.nextNode = node;
      }
      else {
        prevNode.nextNode = newNode;
        newNode.nextNode = node;
      }

      if(newNode.nextNode == null) {
        this.tail = newNode;
      }
    }
    this.size++;
  }
  
  removeAt(index) {
    let node = this.head;
    let prevNode = null;
    for(let i = 0; i < index; i++) {
      prevNode = node;
      node = node.nextNode;
    }
    if(prevNode == null) {
      this.head = node.nextNode;
    }
    else {
      prevNode.nextNode = node.nextNode;
      if(prevNode.nextNode == null) {
        this.tail = prevNode;
      }
    }
  }
}


class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

// const ll = new LinkedList();
// ll.append("dog");
// ll.append("cat");
// ll.insertAt("mouse", 1);
// console.log(ll.toString());
// ll.removeAt(0);
// console.log(ll.toString());