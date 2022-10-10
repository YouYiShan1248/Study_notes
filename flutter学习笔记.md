**flutter****学习笔记**

 **GetX****的使用和理解**

**一、**  **Obx****响应式状态管理**

\1. 原理

Dart中的扩展语法 .obs，当我们调用0.obs时，他的返回类型为RxInt。而RxInt类的继承关系如下：

​                               ![image-20221010101304367](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20221010101304367.png)

obs 支持的类型包括RxInt、RxString、RxDouble、RxBool、Rx。但是，其实这都是_RxImpl的子类，RxObjectMixin提供了数据绑定以及方便的刷新等方法，而数据监听和更新的能力来自于RxNotifier。

RxNotifier是在initstate方法中绑定了观察者订阅关系，如果监听到变化，会执行 _updateTree 方法然后调用setState去刷新。

RxNotifier并没有自己的实体，所以接口RxInterface定义的方法，都由NotifyManager实现。在NotifyManager中，GetStream提供了一系列的监听方法，用于对流的状态监听。提供了一系列的管理方法，用于管理订阅者和事件分发。当RxNotifier接收到通知后，就会通过listen回调分发给Obx()去刷新UI。

 ![image-20221010101320711](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20221010101320711.png)

我们的变量，通过扩展的方式（.obs），获取到了一个支持数据绑定(RxObjectMixin)和数据事件分发(RxNotifier)的Rx对象。

当系统构建UI时，调用_ObxState的build()方法，从而以隐式的方式调用count.toString()方法，而RxObjectMixin.toString()方法又隐式的调用了value的get方法。在get方法中，由于之前的proxy交换操作，致使当前proxy为当前_ObxState._observer，最终将value的数据变更流整合到了_ObxState._observer中。

当count变更时，触发他自己的事件流，同时触发_ObxState._observer的事件流，最终更新UI。

 

 

\2. 使用

我们对需要进行状态管理的变量，通过例如：

***var count= 0.obs\***   的方式定义。

在需要状态改变的组件上包裹一个Obx组件，通过***Obx(()=>Widget())\***   的方式实现。

 

**二、**  **GetxController**

\1. 介绍

GetxController主要的作用是用于UI代码与业务逻辑分离开

我们的Controller需要继承GetxController，将业务代码完成在Controller中。



 

\2. 关于GetxController内部构造

 

 ![image-20221010101336676](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20221010101336676.png)

GetxController通过继承DisposableInterface和mixin ListNotifier的方式，提供了生命周期和批量更新的能力。而GetX要求入参为DisposableInterface类型，实现了共享实例生命周期的维护。与Obx相同，使用了proxy交换的方式，实现了响应式更新。

 

\3. 关于GetxController生命周期

• ***onStart()\*** 虽然是Function类型，但是以final变量的方式存在，用来防止子类重写。本方法将在widget被加载到内存中时由框架调用。此方法的默认实现会检查是否已经初始化，如果没有，则调用onInit()方法，所以多次调用onStart，只会执行一次onInit() 

• ***onInit()\*** 本方法会在widget被加载到内存中后调用。一般用来初始化一些后续需要使用的对象。 

• ***onReady()\*** 此方法会比onInit()方法晚调用一帧，此方法一般用于执行snackbar、新的路由等需要页面init完成后执行的操作。 

• ***onDelete()\*** 和onStart很类似，也是用于框架调用的final变量类型的Function。默认会关联调用onClose()，并且执行多次，也只会执行一次onClose()。 

• ***onClose()\*** 此方法用于回收资源，类似Widget中的dispose方法。

 

\4. ***put\***依赖注入

Getx 管理依赖关系就是将依赖对象封装为 _InstanceBuilderFactory 对象通过 key 保存到 Map 中，如果对应的key 值已经存在，且没有标记为等待销毁，则会忽略 put 操作，否则插入新的 _InstanceBuilderFactory 对象。

最终传入的依赖对象会被封装到 _InstanceBuilderFactory 对象里再放入到 _singl 的 Map 里，_InstanceBuilderFactory里通过getDependency 方法获取依赖，通过判断是否为单例调用builderFunc 方法，builderFunc 方法是一开始在 put 中传入的 builder，put 方法最后调用了 find 方法并把返回值 return 了回去。

 

我们可以通过Get.put的方式，实例化我们的Controller 例如：

***MessagesController messagesController = Get.put(MessagesController());\***

 

· ***Get.put()\*****：** 不使用控制器实例也会被创建

· ***Get.lazyPut()\*****：** 懒加载方式创建实例，只有在使用时才创建

· ***Get.putAsync<T>()\*****：** Get.put()的异步版版本

·  ***Get.create<T>()\*****：** 每次使用都会创建一个新的实例

 

 

 

三、  **GetBuilder**

1.介绍

  GetBuilder是一个 Widget 组件， 在 GetX 的状态管理中，GetBuilder 的主要作用是结合 GetxController 实现界面数据的更新。当调用 GetxController 的 update 方法时，GetBuilder 包裹的 Widget 就会刷新从而实现界面数据的更新。

2.

四、  **在GetMaterialApp下的国际化配置**

 

\1. 使用方式

***translations: Messages()\***, 国际化配置文件

***locale: Locale('zh', 'CN')\***,  设置默认语言

***fallbackLocale: Locale("zh", "CN")\***，在配置错误的情况,使用的语言

我们的国际化配置文件类Messages()需要继承自Translations并重写keys方法。之后通过创建Controller类实现业务代码，最后实例化使用即可

 

**五、**  **利用GetxService实现GetX数据持久化**

\1. 使用方式

它共享相同的生命周期onInit()、onReady()、onClose()。GetxService 这个子类不能从内存中删除。

使用时让我们的持久化Service类继承GetxService ，利用第三方库SharedPreferences 实现持久化。

 

 

Future<void> initServices() async {

 print("初始化服务");

 await Get.putAsync(() async => await Service());}

 

Future<void> main() async {

 await initServices();

 runApp(MyApp());}

 

我们可以通过异步初始化服务方法，初始化我们的Service，然后在我们代码运行前（runApp（）前），先执行我们的初始化方法。我们也可以通过Get.find去查找Service类中的方法，

Get.find<Service>().SharedPreferences ();

 

**六、**  **Binding**

\1. 作用

Bindings 主要配合 GetX 路由和依赖一起使用，作用是在路由跳转页面加载时注入当前页面所需的依赖关系。Bindings 的好处是能统一管理页面的依赖关系，当业务复杂时可能一个页面需要注入大量的依赖，此时使用 Bindings 能更方便的维护页面的依赖关系。

 

\2. 原理

Bindings 是一个抽象类，只有一个 dependencies 抽象方法，在页面路由中注册 Bindings 后，页面初始化时会调用 Bindings 的 dependencies 方法，初始化页面依赖，其调用是在 GetPageRoute 的 buildContent 中，而 GetPageRoute 是继承至 Flutter 的 PageRoute 即在路由跳转加载页面内容时调用。

 

\3. 使用

我们GetMaterialApp下有一个initialBinding的属性用于初始化我们所有的Binding，

我们可以创建不同的ControllerBinding类去implements Binding,通过重写dependencies()方法，在其中

***Get.lazyPut<BindingMyController>(() => BindingMyController());\***

来Binding我们的Controller。

这样经过initialBinding后，我们使用时就只需要Get.find<>()对应的BindingController就可以调用其中的方法。

 

 

 

**Flutter****混合开发理解**

 

一、理解概述

我们在将flutter混合到原生上有两个技术问题，第一个是UI显示机制，第二个是UI事件机制，为了解决这两个问题，我们利用了两个view来实现，一个是通过FlutterSurfaceView来显示我们Flutter的UI视图，FlutterView用来完成事件机制，而FlutterView是一层透明的视图它有很多事件收发，覆盖在我们FlutterSurfaceView上面的（把FlutterSurfaceView添加到FlutterView的容器中），我们的点击事件没有直接接触到我们的FlutterSurfaceView，而是通过FlutterView这个父容器，直接进行事件消费。

 

二、第一代PlatformView

Flutter对Android上的支持主要是通过VirtalDisplay（一个类似于虚拟的显示区域），VirtalDisplay在Android原生上主要用于副屏或录屏的场景上，在flutter里，VirtalDisplay将虚拟显示区域的内容渲染到内存的service上，flutter通过在AndroidView上提供size、offset占位，然后将VirtalDisplay在内存渲染的画面混合到一块去绘制。

问题：1.触摸事件——>产生错位

2.文字输入——>焦点获取

 

三、第二代HybridComposition

把原生NativeView控件通过addView添加到flutterView控件上，flutter会叠加一个FlutterImageView来承接，通过物力堆叠的方式实现。

 

四、第三代（Flutter 3.0）TextureLayer

从 VirtualDisplay 到 TextureLayer主要修改的地方在于底层对于纹理的提取和渲染逻辑；它的实现是通过替换掉View上的Canvas,然后让原生的控件绘制在内存里再去提取。

在TextureLayer 的实现里，同样是需要把控件添加到一个 PlatformViewWrapper 的原生布局控件里，但是这个控件通过 override 了 View 的 draw 方法，把原本的 Canvas 替换成 SurfaceTexture 在内存的 Canvas ，所以  PlatformViewWrapper 的 child 会把控件绘制到内存的 SurfaceTexture 上。

 

 

**Git****使用方法**

 

**一、** **git****工作区域与流程**

 ![image-20221010101359396](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20221010101359396.png)

**Workspace**：工作区，就是平时进行开发改动的地方，是当前看到最新的内容，在开发的过程也就是对工作区的操作

**Index**：暂存区，当执行 git add 的命令后，工作区的文件就会被移入暂存区，暂存区标记了当前工作区中那些内容是被 Git 管理的，当完成某个需求或者功能后需要提交代码，第一步就是通过 git add 先提交到暂存区。

**Repository**：本地仓库，位于自己的电脑上，通过 git commit 提交暂存区的内容，会进入本地仓库。

**Remote**：远程仓库，用来托管代码的服务器，远程仓库的内容能够被分布在多个地点的处于协作关系的本地仓库修改，本地仓库修改完代码后通过 git push 命令同步代码到远程仓库。

**二、** **git****的基本操作**

**git add****：**

添加某个文件到暂存区，后面可以跟多个文件，以空格区分

git add xxx

 

添加当前更改的所有文件到暂存区。

git add .

 

  **git commit****：**

提交暂存的更改，会新开编辑器进行编辑

git commit 

 

提交暂存的更改，并记录下备注

git commit -m "you message"

 

等同于 git add . && git commit -m

git commit -am

 

对最近一次的提交的信息进行修改,此操作会修改commit的hash值

git commit –amend

 

**git pull****：**

从远程仓库拉取代码并合并到本地

git pull <远程主机名> <远程分支名>:<本地分支名>

 

使用rebase的模式进行合并

git pull --rebase <远程主机名> <远程分支名>:<本地分支名>

 

**git fetch:**

仅仅只会拉取远程的更改，不会自动进行 merge 操作。对当前的代码没有影响。

获取远程仓库特定分支的更新

git fetch <远程主机名> <分支名>

 

获取远程仓库所有分支的更新

git fetch –all

 

 

**git branch****：**

新建本地分支，但不切换

git branch <branch-name> 

 

查看本地分支

git branch

 

查看远程分支

git branch -r

 

查看本地和远程分支

git branch -a

 

删除本地分支

git branch -D <branch-name>

 

重新命名分支

git branch -m <old-branch-name> <new-branch-name>

**一、**  **flutter****基础**

**1.** **dart****单线程模型的运行流程**

Dart 在单线程中是以消息循环机制来运行的，包含两个任务队列，一个是“微任务队列” microtask queue，另一个叫做“事件队列” event queue。

​	当Flutter应用启动后，消息循环机制便启动了。首先会按照先进先出的顺序逐个执行微任务队列中的任务，当所有微任务队列执行完后便开始执行事件队列中的任务，事件任务执行完毕后再去执行微任务

 

**2.** **dart****如何实现多任务并行(isolate)**

​	Dart单线程模型中，我们处理异步任务的基础就是isolate，isolate是运行所有dart代码的地方，它有自己的内存空间和一个运行事件循环的单一线程，而当我们想要创建一个新的Isolate可以使用Isolate.spawn方法获取返回的一个新的isolate对象，因为我们isolate之间是相互隔离的，所以isolate之间只能通过互相发送信息来交互，因为没有内存共享，所以我们不需要对isolate进行内存分配和垃圾回收上锁。

 

**3.** **说一下Stream，Stream 有哪两种订阅模式？分别是怎么调用的？**

在Dart中，Stream 和 Future 一样，都是用来处理异步编程的工具。它们的区别在于，Stream 可以接收多个异步结果，而Future 只有一个。

Stream 的创建可以使用 Stream.fromFuture，也可以使用 StreamController 来创建和控制。

Stream有两种订阅模式：单订阅(single) 和 多订阅（broadcast）。单订阅就是只能有一个订阅者，而广播是可以有多个订阅者。这就有点类似于消息服务（Message Service）的处理模式。单订阅类似于点对点，在订阅者出现之前会持有数据，在订阅者出现之后就才转交给它。而广播类似于发布订阅模式，可以同时有多个订阅者，当有数据时就会传递给所有的订阅者，而不管当前是否已有订阅者存在。

Stream 默认处于单订阅模式，所以同一个 stream 上的 listen 和其它大多数方法只能调用一次，调用第二次就会报错。但 Stream 可以通过 transform() 方法（返回另一个 Stream）进行连续调用。通过 Stream.asBroadcastStream() 可以将一个单订阅模式的 Stream 转换成一个多订阅模式的 Stream。 

 

**4.** **mixin****机制**

Dart为了支持多重继承，引入了mixin关键字， mixin定义的类不能有构造方法，这样可以避免继承多个类而产生的父类构造方法冲突。mixins的对象是类，可以mixins多个类的。

 

**5.** **flutter****的热重载**

在我们改动dart代码后，会产生一个Kernel文件，这个新的Kernel会和原先的Kernel文件进行对比，将两个文件进行合并，然后形成一个新的KernelFile，然后通知flutter的framework层重建widget。

 

**6.** **flutter****理念架构**

Flutter框架自上而下分为：

\1. Framework层：用Drat编写的一套基础视图库，包含了动画、图形绘制和手势识别等功能。

\2. Engine层：由C/C++编写的，Skia 2D的绘图引擎，去做一些图形转换、文字渲染、位图渲染的工作。Engine层具有独立虚拟机，正是由于它的存在，Flutter程序才能运行在不同的平台上，实现跨平台运行。

\3. Embedder层：是操作系统适配层，实现了渲染 Surface设置，线程设置等。

 

**7.** **Stateful Widget****生命周期**

在Stateful Widget会执行createState()来创建我们的Stateful Widget，之后会先initState进行初始化，在initState之后会执行didChangeDependencies()，在此时会执行build()，当我们运行过程中执行了setState和didUpdateWidget时，会重新执行build()方法，来重新绘制我们的widget，当我们在dispose销毁页面之前会先执行deactivate方法。所以整个生命周期顺序是：

initState()

didChangeDependencies()

build()

deactivate() 

dispose()

此外还有widget状态发生改变时调用的didUpdateWidget和setState



**8.** **flutter****绘制流程**

我们的flutter只会向GPU提供视图数据，GPU将VSync信号同步到UI线程，UI线程通过dart来构建视图数据，这个数据会在GPU线程进行合成，然后把这个视图数据提供给Skia引擎进行渲染，然后再传回给GPU。

 

**9.** **flutter****与Android原生如何进行通信？**

flutter是通过PlatformChannel来和原生进行通信的，PlatformChannel有3中方法：

BasicMessageChannel:用来传递字符串和半结构化信息（就是传一些字符串，我认为这种方法很少使用）

MethodChannel：用于传递方法调用（我认为在双向传输数据时，这是flutter与Android相互传递信息最常用的方法）

EventChannle：单向传输的数据流通信（这是Android向flutter单方面提供数据通信的方法，如果要相互通信还是使用MethodChannel）

 

**10.** **flutter****中的key？**

对于相同类型的widget集合，当我们需要去修改其中的状态的时候，我们就会用到key，这是因为我们每一个widget树会对应生成一个element树，当我们在刷新的时候，我们的element树会通过遍历去比较它所对应widget树的类型，查看它的骨架结构是否一致，所以当我们修改了相同类型的widget的状态时，我们的element树会认为这与之前的widget树类型相同，就不会进行修改。而我们的key就是标识我们widget树与element树的属性，这样，当我们widget树发生改变，我们的element树在遍历时就会重新匹配我们的key所对应的widget。

我们的key应该放在widget集合的widget树顶端，对于widget集合里，我们可以使用ValueKey，对于一个数据组合，可以使用ObjectKey，对于全局保持状态统一，可以使用GlobalKey。

 

**二、**  **flutter****进阶**

**1.** **说一下GetX 的get 、put机制相对于Provider的区别**

设计模式上：GetX在进行依赖注入后，会有GetX自己的框架来维护，引入了中间层来管理，设计模式上采用了中介者模式，将对象注入到自身put到GetInstance中间层中，我们的类再从GetInstance中find想要的对象。而Provider里面的ChangeNotifier的刷新机制是通过观察者模式。

Provider的实现逻辑还是基于flutter的InheritedWidget来完成的，这当中是依赖于我们的context的，而GetX不依赖于context，简单的讲就是通过监听事件流来完成的更新。

 

**2.** **从打开一个app到第一帧Flutter视图出现，中间发生了什么，围绕activity生命周期，surfaceview生命周期，jni来说。**

Activity生命周期，按照顺序是创建过程：onCreate，onStart，onResume，销毁过程：onPause，onStop，onDestroy，我们的页面在onResume后进入了ActivityRunning的状态，我们的用户就能进行交互了，我们的动画也是添加在onResume方法中，在onStop时，也可以通过onRestart方法重新进行onStart。因为SurfaceView显示的是动态的画面，而且对性能要求很高，所以SurfaceView的生命周期：

当Activity完全显示之后，SurfaceView才会被创建

只要Activity不是在前台，SurfaceView就会销毁

**3.** **如果让你不依赖任何第三方框架还有Flutter自带的ChangeNotifier去实现一个状态管理，你会如何设计。**

使用InheritedWidget来完成状态管理，InheritedWidget刷新机制是调用InheritedElement中的notifyClients方法，来刷新_dependents里面所有的Element，来达到的状态更新。我们在树下的widget可以利用InheritedWidget依赖我们的context来向上爬树获取我们的data，也就是说它允许从树的上方获取状态。

思路：我们需要一个东西来存储数据，如果数据改变，就改变一个widget，这需要建立一个依赖关系，那么可以使用数据结构中的有向图来表达我们的依赖关系，从设计模式的角度，我们可以用到我们的观察者模式，我们可以通过节点来存储我们的状态，边来表示传递的方向，建立绑定关系，监听节点的状态是否发生改变，如果状态发生改变那对应的对象也发生改变。我们需要两个Map来存放我们的状态，一个newState，一个当前State，再用一个方法来监听newState和当前State是否相等，把newState赋给当前的State。更新widget就需要用到InheritedWidget来实现。

 

**4.** **屏幕适配的原理**

以flutter_screenutil为例：我们通过初始化一个屏幕的参考的长和宽，将我们的实际长度和宽度与这个参考的长和宽做比，得到一个可以等比放大或缩小的值，使用百分比来进行布局。

还有一种是以前我在没有使用第三方库时采取的屏幕适配方案，就是利用rpx与px之间的转换，我们通过获取屏幕的长度和宽度，除以一个750得到rpx，在设置widget长宽时都已rpx为参照。其实这种适配方案的根源也是百分比布局，原理和flutter_screenutil一样。

 

 

**5.** **如何捕捉未被try catch的异常**

对于异步任务抛出的异常，不能被try catch到，所以在dart:async 库中有一个异步捕获异常的函数 runZonedGuarded ，可以通过runZonedGuarded 函数捕获异常。

 

**6.** **如何理解flutter是自渲染的，与原生app在渲染机制上的区别，可从音视频以及游戏开发的角度展开**

​	在Flutter之前，自渲染的有，音视频，游戏，在原生app中，app内只是告诉系统自己需要展示的组件，还有组件的样式，最后这些组件都是来自系统，所以就会出现，同样的组件，在不同android版本上的样式是不同的，而音视频和游戏为何是自渲染，这俩在界面上都是只有一个大的SurfaceView，其内容的显示完全由app内控制，不需要依赖系统其他的组件，这也是Flutter与React Native的区别，RN还是将js编写的视图通过c++映射成了native的view，Flutter同游戏展示的界面，同音视频播放视频的窗口一样，都只有一个大的SurfaceView，这点可以借助开发者工具的视图检测工具查看，其内部视图的展示完全由c++引擎层操作Surface完整，这便是自渲染	

我们flutter和Android都是利用Skia2D绘制引擎库进行绘制和渲染的，Flutter框架分为了三层，最上层是由dart编写的framework层，是主要绘制我们的图形，还有我们的一些手势功能等等，而渲染是交给了我们的Engine层，这一层是由C/C++编写的Skia引擎库，我们的Android原生在进行绘制的时候呢，是先把我们的xml文件进行解析，反射成Java对象，然后通过调用onDraw方法通过传入Skia引擎所提供的Canvas接口，来进行绘制， flutter从资源消耗和加载速度的角度上是优于我们的Android原生的。

​	Flutter可以对局部进行刷新，而在Android原生中提供了一个可以控制刷新频率的SurfaceView来解决反复局部刷屏带来的闪烁，SurfaceView在子线程刷新不会阻塞主线程，适用于界面频繁更新、对帧率要求较高的情况。SurfaceView底层利用双缓冲机制。游戏，视频等画面变化较频繁，前面还没有显示完，程序又请求重新绘制，这样屏幕就会不停地闪烁。双缓冲技术会把要处理的图片在内存中处理好之后，把要画的东西先画到一个内存区域里，然后整体的一次性画出来，将其显示在屏幕上。

 

**7.** **如何将Flutter集成到一个现有的原生android app工程**

这个我还没上手集成完，只在AndroidStudio当中创建了FlutterModule项目，编译了aar文件，还没有添加其他的依赖，还有FlutterActivity这些。

 **8.surfaceview和textureview区别**

​	SurfaceView中采用了双缓冲机制，同时 SurfaceView 不在主线程中绘制，而是另开辟一个线程，所以它不妨碍UI线程；SurfaceView的内容不在应用窗口上，所以不能使用变换（平移、缩放、旋转等）。Textureview必须在硬件加速开启的窗口中，TextureView并没有创建一个单独的Surface用来绘制，是支持动画等操作的。

**9.setState原理**

将当前状态标记为 脏，下次vsync信号到来，就会根据这个标记，重新布局

