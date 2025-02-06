/*

*************************** বেসিক লেভেল ************************

স্টেটের ঘোষণা ও ব্যবহার:

স্টেট ঘোষণা:
javascript

const [count, setCount] = useState(0);

count হলো আপনার স্টেটের মান।

setCount হলো স্টেট আপডেট করার জন্য ব্যবহৃত ফাংশন।

স্টেট আপডেট:
javascript

<button onClick={() => setCount(count + 1)}>বাড়াও</button>

এই বাটনে ক্লিক করলে count ১ দিয়ে বাড়বে।

ইনপুট ফিল্ডের সাথে স্টেট:
javascript

const [text, setText] = useState('');
<input value={text} onChange={(e) => setText(e.target.value)} />

ইনপুটের মান যতবার পরিবর্তন হবে, text স্টেট ততবার আপডেট হবে।

/*********************************  মিড লেভেল: ************************



কমপ্লেক্স স্টেট কাজ করা:

অবজেক্ট স্টেট:
javascript

const [person, setPerson] = useState({name: '', age: 0});
<input value={person.name} onChange={(e) => setPerson({...person, name: e.target.value})} />

এইভাবে অবজেক্টের কোনো একটি প্রোপার্টি আপডেট করা যায়।


**************************

অ্যারে স্টেট:
javascript

const [todos, setTodos] = useState([]);
setTodos([...todos, {id: todos.length, text: 'নতুন টোডো'}]);

নতুন আইটেম যোগ করা বা বিদ্যমান অ্যারে আপডেট করা যায়।

********************************************** 

ফাংশন পাস করে স্টেট আপডেট:
javascript

setCount(prevCount => prevCount + 1);

এই পদ্ধতি ব্যবহার করে আপনি পূর্বের স্টেট মানের উপর ভিত্তি করে নতুন মান সেট করতে পারেন, যা কিছু ক্ষেত্রে বিশেষভাবে উপযোগী।

****************************************************  Example 1

function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}

import { useState } from 'react';

export default function Counter() {
  const [age, setAge] = useState(42);

  function increment() {
    setAge(a => a + 1);
  }

  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <button onClick={() => {
        increment();
      }}>+1</button>
    </>
  );
}



*/

