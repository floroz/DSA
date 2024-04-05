import { describe, it, expect } from 'vitest';

class LinkedListNode<T> {
    constructor(public value: T | null, public next: LinkedListNode<T> | null){
    }
}

class LinkedList<T> {
    head: LinkedListNode<T> | null = null;
    tail: LinkedListNode<T> | null = null;
    length = 0;

    add(value: T){
        this.length++;
        const insert = new LinkedListNode(value, null)

        if (this.head == null) {
            this.head = insert;
            this.tail = insert;
            return this.head;
        }

        let node = this.head;

        while (node.next) {
            node = node.next
        }

        node.next = insert;
        this.tail = insert;
        return insert;
    }

    pop(): LinkedListNode<T> | null {
       if (this.length > 0) {
        this.length--
       }

        if (!this.head) {
            return null
        }

        let node = this.head;

        while (node.next?.next) {
            node = node.next
        }
        let tmp = node.next;

        node.next = null;
        this.tail = node;

        return tmp;
    }   

    unshift(): LinkedListNode<T> | null {
        if (this.length > 0) {
            this.length--
           }

        if (!this.head) {
            return null;
        }

        if (!this.head.next) {
            let tmp = this.head;
            this.head = null;
            return tmp;
        }

        const tmp = this.head;
        this.head = tmp.next;
        return tmp;
    }
};


describe('linked list', () => {
    it("should be able to create a linked list", () => {
        const linkedList = new LinkedList();
        expect(linkedList).toBeInstanceOf(LinkedList);
        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();
    })

    it("should be able to add a node to the linked list", () => {
        const linkedList = new LinkedList<number>();
        linkedList.add(1);
        expect(linkedList.head?.value).toBe(1);
        expect(linkedList.tail?.value).toBe(1);
    })

    it("should set the correct references for the .next property when adding a node", () => {
        const linkedList = new LinkedList<number>();
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);
        expect(linkedList.head?.next?.value).toBe(2);
        expect(linkedList.head?.next?.next?.value).toBe(3);
        expect(linkedList.head?.next?.next?.next).toBeNull();
        expect(linkedList.tail?.value).toBe(3);
    })

    it("should be able to pop the last node from the linked list", () => {
        const linkedList = new LinkedList<number>();
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);
        const poppedNode = linkedList.pop();
        expect(poppedNode?.value).toBe(3);
        expect(linkedList.head?.next?.next).toBeNull();
        expect(linkedList.tail?.value).toBe(2);
    })

    it("should be able to remove the first node from the linked list", () => {
        const linkedList = new LinkedList<number>();
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);
        const removedNode = linkedList.unshift();
        expect(removedNode?.value).toBe(1);
        expect(linkedList.head?.value).toBe(2);
        expect(linkedList.head?.next?.value).toBe(3);
        expect(linkedList.tail?.value).toBe(3);
    })
})