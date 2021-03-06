## 简版Promise

> 2020.05.24

### 实现

基本定义
```javascript
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
function SPromise (executor) {
  this._status = PENDING;
  this._value = undefined;
  this._listeners = [];
  const resolve = (value) => {
    if (this._status === PENDING) {
      this._status = RESOLVED;
      this._value = value;
      for (let i = 0; i < this._listeners.length; i++) {
        this._listeners[i]();
      }
    }
  };
  const reject = (reason) => {
    if (this._status === PENDING) {
      this._status = REJECTED;
      this._value = reason;
      for (let i = 0; i < this._listeners.length; i++) {
        this._listeners[i]();
      }
    }
  };
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
```

then方法
```javascript
SPromise.prototype.then = function (onResolve, onReject) {
  const resolveHandler = 
    typeof onResolve === 'function' ? onResolve : v => v;
  const rejectHandler = 
    typeof onReject === 'function' ? onReject : v => {
      throw(r);
    };

  return new SPromise((resolve, reject) => {
    const task = () => {
      try {
        const x = 
          this._status === RESOLVED 
            ? resolveHandler(this._value) 
            : rejectHandler(this._value);
        resolve(x);
      } catch (e) {
        reject(e);
      }
    };
    if (this._status === PENDING) {
      this._listeners.push(task);
    } else {
      task();
    }
  });
};
```

then和reject方法
```javascript
SPromise.resolve = function (value) {
  return new SPromise((resolve, reject) => {
    resolve(value);
  })
};

SPromise.reject = function (reason) {
  return new SPromise((resolve, reject) => {
    reject(reason);
  })
};
```

all方法
```javascript
SPromise.all = function (tasks) {
  if (!Array.isArray(tasks)) {
    // 非数组参数异常
    return SPromise.reject(tasks);
  }
  const result = [];
  let count = 0;
  return new SPromise((resolve, reject) => {
    // 判断数组类型
    for (let i = 0; i < tasks.length; i++) {
      SPromise.resolve(tasks[i]).then(
        v => {
          result[i] = v;
          count++;
          if (count === tasks.length) {
            resolve(result);
          }
        },
        r => {
          reject(r);
        },
      );
    }
  });
};
```

### 应用

```javascript
const task = new SPromise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 1000);
});

task.then(
  v => {
    console.log('then', v);
  },
  r => {
    console.log('catch', r);
  }
);

setTimeout(() => {

task.then(
  v => {
    console.log('delay then', v);
  },
  r => {
    console.log('delay catch', r);
  }
);
}, 2000);
```

## Link

+ [上一篇：**JS中的模块化**](../Syntax/JS中的模块化.md)
+ [下一篇：**网络连接的建立与终止**](../Network/网络连接的建立与终止.md)