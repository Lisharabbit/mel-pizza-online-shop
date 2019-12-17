function renderToppings(state) {
    const { toppings, selectedToppings} = state;
    const parentNode = document.querySelector('.toppings');
    
    clearNode(parentNode);
    // 清空parentNode；

    toppings.forEach(topping => {
        const { name: toppingName } = topping;
        const container = document.createElement('div');
        container.classList.add('topping');

        if (selectedToppings.find(({ name }) => name === topping.name)){
            container.classList.add('active');
        };

        // container.onclick = onToppingClick(state, topping);
        // 这样做会直接执行这一句，所以不行，onToppingClick应该在被点击的时候才执行
        container.onclick = function() {
            onToppingClick(topping, state);
        }; 
        // 以上改为了高阶函数；container.onclick 拿到的是一个function，通过这种方法我们可以把state 和 topping 传进来；
        // topping 有了，state 没有，所以我们要声明state

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('img');

        const  image= document.createElement('img');
        image.alt = toppingName;
        image.src = `${toppingName}.svg`;

        const name = document.createElement('span');
        name.innerText = toppingName;

        container.append(imageContainer, name);
        imageContainer.append(image);
        
        parentNode.append(container);
    });
}

function onToppingClick(topping, state) {
    const { selectedToppings } = state;
    const isExists = state.selectedToppings.find(({ name }) => name === topping.name);

    // if (!isExists) {
    //     const newSelectedToppings = [topping, ...selectedToppings];
    //     // 更改状态之后要把状态塞回去
    //     // es6的用法
    //     // 等同于  const newArray  = [] ; newArray.push(topping); newArray.concat(selectedToppings)
    //     state.selectedToppings = newSelectedToppings;
    //     // 更改状态之后要把状态塞回去
    //     renderToppings(state);
    //     return;
    // }

    // selectedToppings = onToppingClick (selectedToppings);
    // const newSelectedToppings = selectedToppings.filter(({ name }) => name !== topping.name);

    const newSelectedToppings = !isExists
        ? [{ ...topping, amount:1 }, ...selectedToppings] 
        : selectedToppings.filter(({ name }) => name !== topping.name);

    state.selectedToppings = newSelectedToppings;

    render(state);
}