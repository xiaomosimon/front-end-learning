#  CSS集合

## CSS基础

### 速技属性

- `width` 宽度
- `height` 高度
- `padding` 内边距
- `border` 边框 `border:1px solid red;`
  - `border-color` 边框颜色
    - `border-top-color`  顶部边框颜色
  - `border-width   ` 边框宽度
    - `border-top-width  `  顶部边框宽度
  - `border-style` 边框样式
    - `border-top-style`  顶部边框样式
- `margin` 外边距
- `background-color` 背景颜色
- `background-image` 背景图片
  - 地址图片 `background-image:url()`
    - 多个背景图像 `background-image:url(img1.png), url(img2.jpg), url(img.svg);`
  - 渐变背景，渐变函数`<gradient>`
    - 线性渐变：`background-image: linear-gradient(to right, red, orange, yellow)`
    - 径向渐变：`background-image: radial-gradient(red, yellow, rgb(30, 144, 255))`
    - 重复渐变：重复多次渐变图案直到足够填满指定元素。
      - `background-image: repeating-linear-gradient(to top left, ligtpink, lightpink 5px, white 5px, white 10px);`
      - `background-image: repeating-redial-gradient(blue, blue 8px, white 8px, white 16px);`
- `background-repeat` 背景平铺
  - `no-repeat` 不重复
  - `repeat-x` 水平重复
  - `repeat-y` 垂直重复
  - `repeat` 两个方向重复
- `background-size` 背景图像大小
  - `cover` 覆盖，可能展示不全
  - `contain` 自适应
  - `长度值` 固定尺寸，可能变形 `background-size: 100px 10em;`
- `background-position` 背景图像定位，坐标系是左上角为（0,0），水平是x，垂直是y
  - `关键字`  定义主要的位置 `background-position: top center;`
  - `长度值`
  - `百分比`
  - `混合`  `background-position: top 20px right 40px;`
- `background-attachment` 背景位置控制
  - `fixed` 背景相对于视口固定。即时一个元素拥有滚动机制，背景也不会随着元素内容滚动；
  - `local ` 背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动，并且背景的绘制区域和定位区域是相对于可滚动的区域而不是包含他们的边框；
  - `scroll` 背景相对于元素本身固定，而不是随着它的内容滚动（对元素边框是有效的）。
- `border-radius` 圆角
  - `border-shadow` 边框阴影

- `overflow`
  - `hidden` 溢出的会被覆盖在盒子里
  - `scorll` 不再溢出，超出盒子可滚动查看
    - `scroll-y`
    - `scroll-x`
- `overflow-wrap`
  - `normal` 初始值，行只能在正常的单词断点处中断，可能会溢出。（例如2个单词之间的空格）
  - `break-word` 如果行内没有多余的地方可以容纳单词结尾，那就会强制分割换行
  - `anywhere` 
- `min-` 
  - `min-width`
  - `min-height`

- `max-`
  - `max-width`
  - `max-height`

- `object-fit`
  - `contain`  填充盒子的同时保留其长宽比
  - `cover` 保持长宽比，超出也被裁剪
  - `fill` 填充盒子尽可能保持长宽比，不匹配就拉伸
  - `none`  保持原有的尺寸
  - `scale-down` 与`none` 或 `contain`的一个相同，取决于两则之间谁得到的尺寸更小一些

- `border-cllapse`
  - `collapse` 相邻的单元格共用同一条边框
  - `separate` 初始值，每个单元格拥有独立的边框


- `list-style` 列表样式
  - `list-style-type`：设置用于列表的项目符号的类型，例如无序列表的方形或圆形项目符号，或有序列表的数字，字母或罗马数字。
  - `list-style-position`：设置在每个项目开始之前，项目符号是出现在列表项内，还是出现在其外。
  - `list-style-image` ：允许您为项目符号使用自定义图片，而不是简单的方形或圆形。
- `cursor` 鼠标样式



#### 字体文本相关

- `font-style`
  - `normal`: 将文本设置为普通字体 (将存在的斜体关闭)
  - `italic`: 如果当前字体的斜体版本可用，那么文本设置为斜体版本；如果不可用，那么会利用 oblique 状态来模拟 italics。
  - `oblique`: 将文本设置为斜体字体的模拟版本，也就是将普通文本倾斜的样式应用到文本中。
- `font-weight`
  - `normal`, `bold`: 普通或者**加粗**的字体粗细
  - `lighter`, `bolder`: 将当前元素的粗体设置为比其父元素粗体更细或更粗一步。`100`–`900`: 数值粗体值，如果需要，可提供比上述关键字更精细的粒度控制。
- `font-transform`  允许你设置要转换的字体
  - `none`: 防止任何转型。
  - `uppercase`: 将所有文本转为大写。
  - `lowercase`: 将所有文本转为小写。
  - `capitalize`: 转换所有单词让其首字母大写。
  - `full-width`: 将所有字形转换成全角，即固定宽度的正方形，类似于等宽字体，允许拉丁字符和亚洲语言字形（如中文，日文，韩文）对齐。
- `text-decoration`
  - `none`: 取消已经存在的任何文本装饰。
  - `underline`: 文本下划线。
  - `overline`: 文本上划线
  - `line-through`: 穿过文本的线。
  - `text-decoration-line`  线类型
  - `text-decoration-color` 线颜色
  - `text-decoration-style` 线样式
- `text-shadow` 文字阴影
  1. 阴影与原始文本的水平偏移
  2. 阴影与原始文本的垂直偏移
  3. 模糊半径 \- 更高的值意味着阴影分散得更广泛
  4. 阴影的基础颜色，默认为 `black`
- `text-align`
  - `left`: 左对齐文本。
  - `right`: 右对齐文本。
  - `center`: 居中文字
  - `justify`: 使文本展开，改变单词之间的差距，使所有文本行的宽度相同
- `line-hight` 行高，推荐的行高大约是 1.5–2 (双倍间距) ，所以要把我们的文本行高设置为**字体高度**的 1.5 倍。
- `letter-spacing` 字母间距
- `word-spacing` 单词间距
- `font-stretch`  为字体定义一个正常或经过伸缩变形的字体外观
- `outline` 设置多个轮廓属性，类似 `border`，但`outline`不占据空间，绘制于元素内容周围
  - `outline-style`
  - `outline-width`
  - `outline-color`




### 盒模型

#### 块级盒子（block box）和内联盒子（inline box）

通过对盒子设置`display`属性，比如`inline`和`block`来控制盒子的外部显示类型。

##### 块级盒子

- 盒子在内联的方向上扩展并占据父容器该方向上的所有可用空间，在绝大数情况下意味盒子会和父容器一样宽；
- 每个盒子都会换行；
- `width`和`height`属性可以发挥作用；
- 内边距（padding），外边距（margin）和边框（border）会将其他元素从当前盒子周围“推开”。

除特殊指定，标题（`<h1>`等）和段落（`<p>`）默认情况下都是块级的盒子。

##### 内联盒子

- 盒子不会产生换行；
- `width`和`height`属性不起作用；
- 垂直方向和内边距、外边距以及边框会被应用但是不会把其他处于`inline`的状态的盒子推开；
- 水平方向的内边距、外边距以及边框会被应用且会把其他处于`inline`状态的盒子推开。

链接（`<a>`）、`<span>`、`<em>`以及`<strong>`都是默认处于`inline`状态。

##### 内部显示类型

默认情况下是按照**正常文档流方向布局。

比如设置flex布局，在一个元素上，外部显示是`block`，内部显示修改为`flex`。该盒子的所有直接子元素都会成为flex元素。

#### CSS组成块级盒子

- Content box：内容区域，大小可以通过设置`width`和`height`；
- Padding box: 内容区域外部的空白区域；大小通过`padding`相关属性设置；
- Border box：边框盒包裹内容和内边距。大小通过`border`相关属性设置；
- Margin box:外区域，是盒子和其他元素之间的空白区域。大小通过`margin`相关属性设置。

#### 标准盒模型

如果给盒设置宽高，实际设置的content box。padding和border再加上设置的宽高一起决定整个盒子的大小。

#### 替代（IE）盒模型

如果给盒设置宽高，实际设置的content box、padding box和border box总和大小。默认为标盒，设置`box-sizing:border-box;`告知浏览器使用`border-box`来定义区域，即变为替代模式。

```css
/** 设置整体为替代模式 **/
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}
```

#### 使用 `display:inline-block;`

此属性是内联和块之间的中间状态。

- 设置`width`和`height`属性生效；
- `padding`,`margin`以及`border`会推开其他元素。

但不会跳转到新行，显示添加宽高，只会变得比其内容更大。



### 处理不同方向的文本

#### 书写模式（内联）

- `writing-mode` 
  - `horizontal-tb` 块流向从上至下。对应的文本方向是横向的。
  - `vertical-rl` 块流向从右向左。对应的文本方向是纵向的。
  - `vertical-lr` 块流向从左向右。对应的文本方向是纵向的。

#### 逻辑属性和逻辑值

##### 逻辑属性

在书写模式下，映射`width`的属性被称为内联尺寸（`inline-size`）——内联维度的尺寸。而映射`height`的属性被称为块级尺寸（`block-size`），这是块级维度的尺寸。

- `inline-size` 和`width`使用方法一致，定义文本方向，内联方向尺寸；

- `block-size` 和`height`使用方法一致，定义块流方向，块级方向尺寸；

- `margin-block-start`  映射`margin-top`，总是指向块级维度开始处的边距；

- `padding-inline-start`  映射`padding-left`，应用到内联开始方向（书写模式文本开始的地方）上的内边距；

- `border-block-end`   映射`border-block-end，块级维度结尾处的边框。

##### 逻辑值

- `top` 映射为`block-start`
- `right` 映射为`inline-end`
- `bottom` 映射为`block-end`
- `left` 映射为`inline-start`



### 选择器

1. 全局选择器：`*{}, .box *:first-child{} `

2. id选择器：`#idName {}`

3. 元素选择器：（标签选择器） `p {}`

4. class类选择器： `.className {}`

5. 属性选择器：

   1. 属性存在： `p[data-name]`

   2. 值匹配：`input[type="radio"]`

   3. 值包含：`button[class~="disable"]`

      ```html
      <button class="btn disable" type="button">按钮1</button> <!-- 匹配 -->
      <button class="disablebtn" type="button">按钮2</button> <!-- 不匹配 -->
      ```

   4. 匹配整个值开始，完全相等或后接`-`连字符内容：`button[class|="color"]`  

      ```html
      <button class="color-red" type="button">按钮1</button> <!-- 匹配 -->
      <button class="color" type="button">按钮2</button> <!-- 匹配 -->
      <button class="btn color-red" type="button">按钮3</button> <!-- 不匹配 -->
      <button class="color-red btn" type="button">按钮4</button> <!-- 匹配 -->
      ```

   5. 匹配整个值开头：`button[class^="state-"]`  

   6. 匹配整个值结尾：`button[class$="-error"]`  

   7. 匹配整个值存在（includes）：`button[class*="state"]`  

   8. 大小写敏感 `i`：`button[class*="warning" i]` 

      ```html
      <button class="warning" type="button">按钮1</button> <!-- 匹配 -->
      <button class="WarNing" type="button">按钮2</button> <!-- 匹配 -->
      ```

6. 伪类（处于特定状态的元素）：

   1. 移上元素触发：`a:hover `

   2. 触焦元素触发：`:focus`

   3. 未曾访问的链接：`:link`

   4. 已访问的链接：`:visited`

   5. 匹配一个链接的未曾访问和可访问的链接状态：`:any-link`

   6. 激活（如点击）元素：`:active`

   7. 处于选中状态的单选或复选框：`:checked`

   8. 处于默认值状态的ui元素（checkbox，radio，section，button使用）：`:default`

   9. 匹配除了可能存在的空格外，没有子元素的元素：`:emoty`

   10. 匹配打印文档的第一页：`:first`

   11. 处于禁默状态的ui元素：`:disabled`

   12. 处于启用状态的ui元素：`:enabled`

   13. 匹配一列兄弟元素中的元素（兄弟元素内有非指定元素也计数）：`p::nth-child(n)`

   14. 匹配兄弟元素中的第一个元素（兄弟元素内有非指定元素也计数）：`p::first-child`

   15. 匹配兄弟元素中的最后个元素（兄弟元素内有非指定元素也计数）：`p::last-child `

   16. 匹配指定类型的一列兄弟元素：`p:nth-of-type(n)`

   17. 匹配兄弟元素中第一个指定类型元素：`p:first-of-type`

   18. 匹配兄弟元素中最后一个指定类型元素：`p:last-of-type`

       ```css
       /* 13-18示例 */
       p:first-child {
         color: red;
       }
       p:first-of-child {
         color: blue;
       }
       ```

       ```html
       <!-- 13-18示例 -->
       <h1>1</h1> <!-- p:first-child 到这结束，因为不是p元素所以是默认字体颜色。 -->
       <p>2</p> <!-- p:first-of-type 到这结束，字体为蓝色。 -->
       <p>3</p>
       <p>4</p>
       ```

   19. 当元素有焦点，且焦点对用户可的时候匹配（比如文本框）： `p:focus-visible`

   20. 匹配有焦点的元素，以及子代元素有焦点的元素（比如表单内容）：`form:focus-within`

   21. 按区间匹配元素，当值在区间内的时候匹配（比如设置input的min和max属性）：`:in-range`

   22. 按区间匹配元素，当值不在区间内的时候匹配（比如设置input的min和max属性）：`:out-of-range`

   23. 匹配未通过验证的表单元素：`:invalid`

   24. 匹配通过验证的表单元素：`:valid`

   25. 基于元素语言（lang属性）匹配元素：`:lang(en)`

   26. 匹配传入的选择器列表中的任何选择器（不能是伪元素或伪类，替代`:matches`和`:any`，接受优先级最高参数的优先级）： `is(#id) is(.className) is(p, span)`

   27. 匹配传入的选择器列表不符合的选择器：`:not(p)`

   28. 匹配没有required属性的表单元素（input,select,textarea）：`:optional`

   29. 匹配必填的表单元素：`:required`

   30. 匹配用户不能编辑的状态元素（如输入框）：`:read-only`

   31. 匹配用户能编辑的状态元素（如输入框）：`:read-write`

   32. 匹配文档树的根元素，对于HTML来说，`:root`代表`<html>`元素，除了比`html`元素选择器优先级更高以外其他是相同的

   33. 匹配一个唯一的页面元素 (目标元素)，其`id`与当前 URL 片段匹配：`:target`

       ```css
       p:target em {
         color: red;
       }
       ```

       ```html
       <a href="#p1">go p1</a>
       <p id="p1">我是<em>p1</em></p>
       ```

7. 伪元素（看似向标记元素加入类似新的元素）：

   1. 选择第一行文本：`p::first-line`
   2. 选择第一个字母:  `p::first-letter` 
   3. 向元素前插入内容：`p::before`
   4. 向元素后插入内容：`p::after`
   5. 被用户选中的部分内容（支持的属性有background-color，color，cursor以及text相关）：`p::selection`

8. 关系选择器：

   1. 后代选择器（匹配后代，会深度匹配）： `body p`
   2. 子代关系选择器（只匹配子代，不会匹配深度的后代）： `.main > p`
   3. 相邻兄弟选择器：  `h1 + p`
   4. 通用兄弟（可以不相邻）：`h1 ~ p`



### 函数

1. `calc()`：做加减运算，例如`div{width: calc(100% - 90px);}`
2. `rgb()`
3. `rgba()`
4. `hsl()`



### 过渡 `transition`，转换 `transform` ，动画 `animation`





### 继承

#### 控制继承

CSS继承提供五个特殊的通用属性值。每个CSS属性都接收这些值

- `inherit` 设置会使子元素属性和父元素相同，实际就是“开启继承”。
- `initial` 将应用于选定元素的属性值设置为该属性的初始值。 
- `revert` 将应用于选定元素的属性值重置未浏览器的默认样式，而不是应用于该属性的默认值。很多情况下，此值类似于`unset`
- `revert-layer` 将应用于选定元素的属性值重置为上一个层叠层中建立的值。
- `unset` 将属性重置为自然值，也就是如果属性是自然继承就是`inherit`，否则和`initial`一样。



####  `all` 重置所有属性



#### 理解层叠

1. 资源顺序

2. 优先级

   - 通用选择、组合符、调整优先级的选择器（`:where()`），伪类（`:not()`,`:is()`）本身无影响

   - `!import` 权重最高，要覆盖`!import`就要设置更高的优先级的`!import`

3. 重要程度



## @规则

### @charset

定义字符编码

```css
@charset "UTF-8";
@charset "iso-8859-15";
```





### @keyframes

定义动画

```css
@keyframes slidein {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
```





### @import 模块引入CSS样式表

`@import url;`

`@import url list-of-media-queries;`  list-of-media-queries 为逗号分割的媒体查询条件列表。

```css
@import url("fineprint.css") print;
@import url("bluish.css") projection, tv;
@import 'custom.css';
@import url("chrome://communicator/skin/");
@import "common.css" screen, projection;
@import url('landscape.css') screen and (orientation:landscape);
```





### @font-face 引入字体

```css
/** 指定要下载的字体 **/
@font-face {
  font-family: "myFont";
  src: url("myFont.ttf");
}
/** 指定要下载的字体示例2 **/
@font-face {
  font-family: 'ciclefina';
  src: url('iconfont.woff2?t=1677498426273') format('woff2'),
       url('iconfont.woff?t=1677498426273') format('woff'),
       url('iconfont.ttf?t=1677498426273') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/** 引用字体 **/
html {
  font-family: "myFont", "Bitstream Vera Serif", serif;
}
```

#### 浏览器兼容

- 大多数现代浏览器都支持 **WOFF / WOFF2**(Web Open Font Format versions 1 and 2，Web 开放字体格式版本 1 和 2)，它是最有效的格式
- **旧版本 IE** 只支持 **EOT** (Embedded Open Type，嵌入式开放类型) 的字体
- **SVG** 版本的字体支持**旧版本的 iPhone 和 Android 浏览器**



### @media 媒体查询

```css
@media media-type and (media-feature-rule) {
  /* ...css code  */
}
```

#### 媒体查询组成

- 一个媒体类型，告诉浏览器代码是用什么类型的媒体上的（例如印刷品或屏幕）；
- 一个媒体表达式，是一个被包含的CSS生效所需的规则或者测试；
- 一组CSS规则，会在测试通过且媒体类型正确的时候应用。

#### 媒体类型

- `all`
- `print`
- `screen`
- `speech`

#### 媒体特征规则

- 基本：`min-`,`max-`,`width`,`height`
- 朝向：`orientation`
  - 竖向 `orientation: portrait`
  - 横向 `orientation: landscape`

#### 指点设备规则

- `hover`  用户可以实现悬浮的设备 `hover: hover`

- `pointer`  
  - 触摸屏  `pointer: coarse`
  - 键盘，语音  `pointer: none`
  - 类似于鼠标或者触控板的东西，可以在精确指向一片小区域   `pointer: fine`
- `color`   彩色设备

#### 规则逻辑

- 与 `and`

- 或 `,`

- 非  `not`

  `@media not all and (monochrome) { ... }` 等价于 `@media not (all and (monochrome)) { ... }`

- 仅 `only`  可防止不支持带有媒体功能的媒体查询的旧版浏览器应用给定的样式。*它对现代浏览器没有影响*

**默认情况下，未指定类型，则使用`all`媒体类型。但使用`only`或`not`，则必须显示指定媒体类型。**





### @supports 特性查询，查询不兼容属性

```css
@supports (display: grid) {}
```









## CSS布局

### 布局模式

- 快布局
- 行内布局
- 表格布局
- 定位布局
- 弹性布局
  - Flex布局
- 网格布局
  - Grid布局



### 覆盖默认布局的行为：

- `display` 属性，比如`block`，`inline-block` 或 `inline` 元素在正常布局流的表现形式就为正常布局。通过设置`flex`，`inline-flex ` 或 `grid` 就会成为 Grid布局 或 Flex布局；
- **浮动**，设置 `float` 值；
- `position`  **定位布局**；
- **表格布局**  使用 `display: table` 在非表格属性上；
- **多列布局（https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Columns）**  设置 `column-conut`、`column-gap` 和 `columns`等一系列属性



## Flex布局

### 特点：

- 单维度布局
- 设置了 `display:flex` 或 `display:inline-flex`的元素即为**flex容器**
- 只针对直系子块集改变，即**flex容器**内的**flex元素**。
- **flex容器**下直系子元素会变成**flex元素**
- 轴线：主轴和交叉轴（不同书写模式（英文，阿拉伯文等）表现不一样，所以不用横轴，竖轴，水平来说）主轴由 `flex-direction` 决定，另外根轴垂直于他。

**flexbox的特性是沿着主轴或者交叉轴对齐之中的元素**

#### 1、flex-direction 决定主轴

```html
<div class="flex">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

以下以英文书写模式为例，默认row情况下，主轴为水平方向，起始线为左边，终点线为右边。

- `row` 主轴为水平方向，起始线在左边，通俗：【flex元素集】在容器左边，起始为 第1个flex元素
  - [1234         ]
- `row-reverse` 主轴为水平方向，起始线在右边，通俗：【flex元素集】在容器右边，且子块排列也反转，起始为 第1个flex元素
  - [         4321]
- `column` 交叉轴为水平方向，起始线在上边，通俗：【flex元素集】在容器顶部，顶部起始为 第1个flex元素
  - 1
  - 2
  - 3
  - 4
- `column-reverse` 交叉轴为水平方向，起始线在下边，通俗：【flex元素集】在容器底部，且flex元素排列也反转，底部起始为 第1个flex元素
  - 4
  - 3
  - 2
  - 1

#### 2、Flex元素

创建**flex容器**可以设置其display为``flex`` 或 ``inline-flex``，直系子元素就会变成**flex元素**。

**flex元素**具有的初始内容：

- 元素排列为一行（flex-direction属性初始值为row）
- 元素从主轴的起始线开始
- 元素不会在主维度（我认为就是主轴）方向拉伸，但是可以缩小
- 元素会在交叉轴上被拉伸来填充大小（**前提是未设置交叉轴方向的值，若交叉轴为水平，则width设置具体值不会改变**）

flex容器具有的初始内容：

- ``flex-basis``属性为auto （根据flex元素设置的尺寸来决定占据主轴空间）
- ``flex-wrap``属性为nowrap（不换行）

初始情况，元素呈线性排列，元素尺寸和数量超出容器，只会溢出而不会换行

#### 3、flex-wrap 实现多行flex容器

- `nowrap` 初始值，不换行，当【flex元素集】过大会缩小每个【flex元素】
- `wrap` 换行，当主轴【flex元素集】过大不能显示就会换行，如果交叉轴【flex元素集】过大就会溢出

#### 4、简写属性 flex-flow

`flex-direction`和`flex-wrap`组合简写，第一个值为`flex-direction`，第二值为`flex-wrap`



### Flex元素上属性

flex容器里除了元素所占的空间以外的富余空间就是**可用空间（available space）**

`max-content` 内容会尽可能大，不会自动换行，如果**flex容器**不够大，就会溢出。

`min-content` 内容会尽可能小和自动换行来确保不溢出，本质上最长单词决定了最小大小。

#### 1、flex-basis 指定 flex 元素在主轴方向上的初始大小

- `auto` 初始值 

  先检查是否设置尺寸再计算出该元素的初始值。

  - 已设置尺寸，则值为设置尺寸。
  - 未设置尺寸，则值为`max-content`。

- `width/height`

  无论设置尺寸多大，最大尺寸为

  ``【主轴空间】-（未设置尺寸的【其他flex元素】缩小到最小内容尺寸 + 已设置尺寸的【其他flex元素】）``

- `0` 可用空间会根据设置分配

#### 2、flex-grow 以 `flex-basis` 为基础，沿主轴方向增长值，占据【可用空间】

- `0` 初始值 不进行增长，不会超过flex-basis值

- `正数` **按比例分配：**
- 同值，【容器可用空间】均分。
  
- 不同值，比如2个flex元素设分别设置1和2，则设置1的分到【容器可用空间】1/3，设置2的分到【容器可用空间】2/3

#### 3、flex-shrink 以 `flex-basis` 为基础，在主轴方向缩小值，收缩所在空间

- `1` 初始值

- `正数` **按比例分配：**

  - 当【flex元素集】的flex-basis的值加起来大于容器时，即要溢出时

    - 同值，均缩小

    - 不同值，设置2的flex元素比设置1的flex元素缩小比例更大

#### 4、简写属性 Flex

`flex-grow`、`flex-shrink`和`flex-basis`的组合写法，第一个值为`flex-grow`，第二值为`flex-shrink`，第三值为`flex-basis`。

- `flex: initial` 初始值，相当于`flex: 0 1 auto`，元素不会超过其自身的`flex-basis`尺寸，且`flex-shrink`为1可以缩小flex元素防止他们溢出。
- `flex: auto` 相当于`flex: 1 1 auto`，元素需要时候可以拉伸和缩小。
- `flex: none ` 相当于`flex: 0 0 auto`，元素既不能拉伸或收缩。
- `flex: 1` or `flex: 2` 相当于`flex: 1 1 0`和`flex: 2 1 0`，元素可以在`flex-basis`为0的基础上伸缩。

#### 5、order 指定在视觉顺序中的显示位置

- `0` 初始值，不进行指定
- `正整数` 指定位置
- `负数` 指定为首先显示

Tip：`order`会更改项目的绘制顺序；对于`order`较低的项目首先绘制。



### 交叉轴上，多条主轴是分开定义的

#### 5、align-content “多条主轴”的子元素集在交叉轴的对齐方式

- `flex-start` 交叉轴开端对齐
- `flex-end` 交叉轴末端对齐
- `center` 交叉轴居中对齐
- `stretch` 初始值，交叉轴方向拉伸
- `space-between  ` 交叉轴两端与“多条主轴”无间距，“多条主轴”间间距一致
- `space-around` 交叉轴两端与“多条主轴”间距是“多条主轴”间距的一半，“多条主轴”间间距一致
- `space-evenly` 交叉轴两端与“多条主轴”间距和“多条主轴”间间距一致

#### 6、align-items 交叉轴上的每条主轴的子元素对齐方式

- `center` 交叉轴居中对齐
- `flex-start` 交叉轴开端对齐
- `flex-end `交叉轴末端对齐
- `stretch` 初始值，交叉轴方向拉伸
- `baseline` 以文本基线对齐

#### 7、align-self 交叉轴上的任意一条主轴的单个子元素对齐方式

`align-items`统一给所有子元素设置`align-self`的对齐属性。

- `center` 交叉轴居中对齐
- `flex-start` 交叉轴开端对齐
- `flex-end `交叉轴末端对齐
- `stretch` 初始值，交叉轴方向拉伸
- `baseline` 以文本基线对齐
- `auto` 重置`align-items`定义的值



### 主轴上

#### 8、justify-content 主轴上的子元素对齐方式

- `center` 主轴居中
- `flex-start` 初始值，主轴开端对齐
- `flex-end` 主轴末端对齐
- `space-between` 主轴两端与子元素无间距，子元素间距一致
- `around-between` 主轴两端与子元素间距为子元素间距一半，子元素间距一致
- `evently-between` 主轴两端与子元素间距和子元素间距一致
- `stretch` 主轴方向拉伸



### 情景

#### 1、使用自动的外边距在主轴上对齐

导航栏，一组重要item左对齐，一组其他item右对齐，则可对右对齐开始item设置``margin-left: auto``

```css
.box {
  display: flex;
}

.item {
  margin-left: auto;
}
```

假设主轴为水平，排列为左对齐。 展示为：		[12        34 ]





## Grid布局

### 特点：

#### 1、固定的位置和弹性的轨道的大小

可以固定轨道尺寸创建网格，比如使用像素。也可以使用百分比或者新单位  `fr`  来创建有弹性尺寸的网格。

#### 2、元素位置

可以使用行号、行名或者标定一个网格区域来精确定位元素。网格同时还使用一种算法来控制未给出明确网格位置的元素。

#### 3、创建额外的轨道来包含元素

可以定义一个显式网格，但会规范处理网格外面的内容，当必要时会自动增加行和列，尽可能多的容纳所有的列。

#### 4、对齐控制

网格包含对齐特点，可控制放置在网格区域中的物体对齐，以及整个网格如何对齐。

#### 5、控制重叠内容

多个元素可以放在网格单元格中，或者区域可以部分地重叠。然后可以从CSS中的`z-index`属性来控制重叠区域显示的优先级。



### 网格容器

一个网格通常具有许多的**列（column）**与**行（row）**，以及行与行，列与列之间的间隙，可称为**沟槽（gutter）**。可通过设置`display: grid` 或 `display: inline-grid`  来创建一个网格。**则直系子元素将成为网格元素。**



### 网格轨道

- `fr` 单位：代表网格容器中可用空间的一等分

- `repeat()`  标记发重复部分或整个轨道列表

  - `auto-fill`  关键字，来替换确认的重复次数   `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`

- `grid-template-columns`  定义网格的列
  
  - `grid-template-columns: 100px 200px 200px; `  设置三个轨道，道宽分别为100px，200px，200px；
  - `grid-template-columns: 1fr 2fr 1fr; `  设置三个轨道，道宽分别容器宽的1/4，2/4，1/4；
  - `grid-template-columns: 100px 2fr 1fr; `  设置三个轨道，道宽分别为的100px，`(容器宽-100px)*2/3`，`(容器宽-100px)*1/3`；
  - `grid-template-columns: 100px repeat(3, 1fr); `  设置四个轨道，道宽分别为的100px，接着的3个道宽均为`(容器宽-100px)*1/3`；  
  - `grid-template-columns: repeat(2, 1fr, 2fr); `    设置四个轨道，道宽分别为容器宽的1/6，2/6，1/6，2/6；  
  
- `grid-template-rows`  定义网格的行

- `minmax()`  定义网格显式内容最小最大尺寸

- `grid-auto-rows `  定义网格隐式内容单列尺寸，即尽可能展示网格元素内容
  - `grid-auto-rows: minmax(100px, auto);`  自动创建行高将会是最小100px，最大为auto。

- `grid-auto-columns `  定义网格隐式内容单行尺寸，即尽可能展示网格元素内容

- `gap` 定义元素行列宽

- `column-gap`   定义元素列间宽

- `row-gap`   定义元素行间宽

- 定义元素基于线放置：

  - `grid-column`   `grid-column: 1 / 3`
    - `grid-column-start`
    - `grid-column-end`

  - `grid-row`  `grid-row: 1 / 3`
    - `grid-row-start`
    - `grid-row-end`

- `grid-template-areas` 放置元素

  ```css
  .container {
    display: grid;
    grid-template-area: 
      "header header"
      "sidebar content"
      "footer footer;";
    grid-template-columns: 1fr 3fr;
    gap: 20px;
  }
  header { grid-area: header; }
  article { grid-area: content; }
  aside { grid-area: sidebar; }
  footer { grid-area: footer;}
  ```

  

## 浮动

设置 `float` 获得浮动元素，脱离正常的文档布局流，其他的周围内容会在其周围环绕。

`float` 属性

- `left`  将元素浮动到左侧
- `right`  将元素浮动到右侧
- `none`  初始值，不浮动
- `inherit`  继承父元素的浮动属性 

`clear` 清除浮动

- `left`  停止任何活动的左浮动
- `right`   停止任何活动的右浮动
- `both`   停止任何活动的左右浮动

### 情景

清除浮动

1. Clearfix 小技巧

   ```css
   .wrapper::after {
     content: "";
     clear: both;
     display: block;
   }
   ```

2. overflow  创建块级格式化上下文，副作用是可能出现滚动条或裁剪阴影

   ```css
   .wrapper {
     overflow: auto;
   }
   ```

3. display: flow-root  创建块格式化上下文，但需要浏览器兼容

   ```css
   .wrapper {
     display: flow-root;
   }
   ```





## 定位

设置 `position` 使元素脱离正常布局流。

5种定位类型：

- **静态定位(static positioning)**  元素默认属性；
- **相对定位(relative positioning)**  相对于元素在正常的文档流中的位置移动；
- **绝对定位(absolute positioning)**  类似单独放在一个图层中。可以将元素相对于页面的  `html` 元素边缘固定，或者相对于该元素的最近被定位祖先元素。
- **固定定位(fixed positioning)**  相对于浏览器的视口固定。
- **粘性定位(sticky positioning)**  先保持和 `position:static`  一样定位，当相对视口位置达到某一个预设值时，元素就会像 `position: fixed` 一样定位。 

`z-index`  参考z轴，改变堆叠顺序。





## 多列布局

`column-count` 多列数量

`column-width` 按照指定的宽度尽可能多的创建列平分

`column-gap`  改变列间间隙

`column-rule`  列间加入一条分割线，属性参照`border`

`break-inside` 控制内容拆分，添加  `page-break-inside`  获取更好的浏览器支持





## 科普

### 1、CSS怎么工作的

#### 浏览器加载网页：

1. 浏览器载入HTML文件（比如网络上获取）；
2. 讲HTML文件转化成一个DOM（Document Object Model），DOM是文件在计算机内存中的表现形式；
3. 浏览器会拉取该HTML相关的大部分资源，比如嵌入到页面的图片、视频和CSS样式。JavaScript则会稍后进行处理；
4. 浏览器拉取到CSS之后进行解析，根据选择器的不同类型（比如element、class、id等）分到不同的“桶”中。浏览器基于“桶”找到的不同的选择器，将不同的规则（基于选择器的规则，如元素选择器，类选择器、id选择器等）应用在对应的DOM的节点中，并添加节点依赖的样式（这个中间步骤称为渲染树）；
5. 上述的规则应用于渲染树之后，渲染树会依照应该出现的结构进行布局；
6. 网页展示在屏幕上（这一步称为着色）。

``loadHTML` --> `parseHTML` --> `Create DOM tree` --> `Display`

`parseHTML` --> `LoadCSS` --> `ParseCSS` -->(Attach style to DOM nodes)--> `Create DOM tree`



### 2、绝对长度单位

1in = 2.54cm = 96px

1英寸等于2.54厘米等于96像素



### 3、相对长度单位

- `em` 

  - 在`font-size`中使用是**相对于父元素的字体大小**

    在**其他属性（如`width`等）**中使用是**相对于自身的字体大小**

- `rem` 根元素`:root` 或 `html`的字体大小

- `vw` 视窗宽度的1%

- `vh` 视窗高度的1%

- `vmin` 视窗较小尺寸的1%

- `vmax` 视窗较大尺寸的1%



### 4、使用百分比参数

- `width/height` 是参考父元素的宽高
- `margin/padding` 是参考父元素的**内联尺寸**（一般英文书写模式是元素水平方向，即`width`）



### 5、表达元素在一些浏览器上不继承字体样式，需重新声明。



### 6、Font简写

许多字体的属性也可以通过 `font`的简写方式来设置 . 这些是按照以下顺序来写的：`font-style`, `font-weight`, `font-stretch`, `font-size`,  `line-height`, and `font-family`.



### 7、BEM（block element modifier）：块元素修饰符

- 块，比如组件命名`.btn`，`.modal`
- 元素，比如组件下的部分元素`.btn__text`，`.modal__title`
- 修饰符，比如组件下的改变`.btn--primary`，`.btn--error`



### 8、管理列表技术

#### start  从 1 以外的数字开始计数

```html
<ol start="5">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ol>
<!--  渲染如下：
5. 1
6. 2
7. 3
-->
```



#### reversed  启动列表倒计数 

```html
<ol start="5" reversed>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ol>
<!--  渲染如下：
5. 1
4. 2
3. 3
-->
```



#### value 允许设置列表项指定树脂

```html
<ol>
  <li value="3">1</li>
  <li value="1">2</li>
  <li value="9">3</li>
</ol>
<!--  渲染如下：
3. 1
1. 2
9. 3
-->
```



### 9、响应式图像

```html
<picture>
  <source srcset="mdn-logo-wide.png" media="(min-width: 600px)">
  <img src="mdn-logo-narrow.png" alt="MDN">
</picture>

<picture>
  <source srcset="mdn-logo.svg" type="image/svg+xml">
  <img src="mdn-logo.png" alt="MDN">
</picture>
```



### 10、永远都不要只用 viewport 单位设定文本

因为文本总是随着视口的大小改变大小，用户失去了放缩任何使用`vw`单位的文本的能力



### 11、视口元标签

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

元标签告诉移动端浏览器，应该将视口宽度设定为设备的宽度，将文档放大到其预期大小的100%。

其他属性：

- `initial-scale`  设定了页面的初始缩放，通常设定为1
- `height`  特别为视口设定一个高度
- `minimum-scale`  设定最小缩放级别
- `maximum-scale`  设定最大缩放级别
- `user-scalable`  如果设为  `no`  的话阻止缩放



### 12、autoprefixer 自定义兼容



























