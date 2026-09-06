const item = (en, zh, level = 1, core = false) => ({ en, zh, level, core });
const topic = (id, label, emoji, sub, mission, words, phrases, sentences) => ({ id, label, emoji, sub, mission, words, phrases, sentences });

const TOPICS = [
  topic("grocery-store", "超市买菜", "🥕", "找货 · 比较 · 结账", "你是顾客，ChatGPT 是店员。找到晚餐食材，比较两个选择，处理缺货替代并结账。",
    [item("aisle", "货架通道", 1, true), item("checkout", "收银台", 1), item("receipt", "小票", 1), item("fresh produce", "新鲜果蔬", 1), item("discount", "折扣", 1), item("ingredient", "食材", 1), item("substitute", "替代品", 2), item("out of stock", "缺货", 2), item("unit price", "单价", 2), item("best-before date", "最佳食用日期", 3)],
    [item("I'm looking for…", "我在找……", 1, true), item("Where can I find…?", "我在哪里能找到……？", 1), item("Is this on sale?", "这个在打折吗？", 1), item("I'll go with this one.", "我就选这个。", 1), item("What's the difference between these?", "这两种有什么区别？", 2), item("Do you have a cheaper alternative?", "有更便宜的替代品吗？", 2), item("Could you check the price for me?", "能帮我查一下价格吗？", 2), item("Which one is better value?", "哪一种更划算？", 3)],
    [item("I'm looking for fresh basil for dinner.", "我在找晚餐要用的新鲜罗勒。", 1), item("Could you tell me which aisle the rice is in?", "能告诉我大米在哪条通道吗？", 1), item("This one is out of stock, so I'll take the substitute.", "这个缺货了，所以我选替代品。", 2), item("I'd prefer the one with the lower unit price.", "我更想要单价较低的那个。", 2), item("If the promotion applies, I'll buy two packs.", "如果参加促销，我会买两包。", 3), item("Could you recommend a similar product with fewer additives?", "能推荐添加剂更少的同类商品吗？", 3)]),

  topic("gym", "健身房训练", "🏋", "动作 · 器械 · 计划", "你是健身者，ChatGPT 是教练。讨论今天的训练，确认深蹲和卧推动作，调整重量并处理一次动作问题。",
    [item("squat", "深蹲", 1, true), item("bench press", "卧推", 1, true), item("dumbbell", "哑铃", 1), item("barbell", "杠铃", 1), item("reps", "次数", 1), item("sets", "组数", 1), item("warm-up", "热身", 1), item("deadlift", "硬拉", 2), item("spotter", "保护者", 2), item("form", "动作姿势", 2), item("range of motion", "动作幅度", 3), item("progressive overload", "渐进超负荷", 3)],
    [item("How many sets should I do?", "我应该做几组？", 1, true), item("Could you check my form?", "能帮我看看动作吗？", 1), item("I'd like to work on my squat.", "我想练深蹲。", 1), item("Can you spot me?", "你能保护我一下吗？", 2), item("I feel it in my lower back.", "我感觉下背部在发力。", 2), item("Should I increase the weight?", "我应该加重量吗？", 2), item("Keep your core braced.", "保持核心收紧。", 3), item("I'm training close to failure.", "我练到接近力竭。", 3)],
    [item("I'm doing three sets of ten squats today.", "我今天做三组、每组十次深蹲。", 1), item("Could you show me how to set up the bench press?", "能教我怎么准备卧推吗？", 1), item("My knees cave in when the weight gets heavy.", "重量变大时我的膝盖会内扣。", 2), item("I'd rather lower the weight and keep good form.", "我宁愿减轻重量并保持正确动作。", 2), item("I'm using progressive overload without sacrificing range of motion.", "我在不牺牲动作幅度的前提下渐进加重。", 3), item("If my form breaks down, I'll stop the set before failure.", "如果动作变形，我会在力竭前结束这一组。", 3)]),

  topic("cafe", "咖啡店点单", "☕", "口味 · 修改 · 付款", "你是顾客，ChatGPT 是咖啡师。选择饮品，描述口味，提出一项修改并完成付款。",
    [item("latte", "拿铁", 1, true), item("espresso", "浓缩咖啡", 1), item("decaf", "无咖啡因", 1), item("oat milk", "燕麦奶", 1), item("syrup", "糖浆", 1), item("to go", "外带", 1), item("extra shot", "加一份浓缩", 2), item("foam", "奶泡", 2), item("roast", "烘焙度", 2), item("aftertaste", "余味", 3)],
    [item("Could I get…?", "我可以要……吗？", 1, true), item("I'd like it to go.", "我要外带。", 1), item("Could you make it less sweet?", "可以少甜一点吗？", 1), item("What do you recommend?", "你有什么推荐？", 1), item("Could I have oat milk instead?", "可以换成燕麦奶吗？", 2), item("Can I add an extra shot?", "能加一份浓缩吗？", 2), item("I'm after something less acidic.", "我想要酸度低一点的。", 3), item("Which roast has a smoother finish?", "哪种烘焙的收尾更顺滑？", 3)],
    [item("Could I get a small latte to go?", "我可以要一杯小杯外带拿铁吗？", 1), item("Please make it half sweet with oat milk.", "请做半糖并换成燕麦奶。", 1), item("I'd like something strong but not too bitter.", "我想要浓一点但不要太苦。", 2), item("If decaf is available, I'll have that instead.", "如果有无咖啡因的，我就换成那个。", 2), item("I prefer a light roast with a clean aftertaste.", "我喜欢余味干净的浅烘焙。", 3), item("Could you balance the extra shot with a little more milk?", "加浓缩后能多放一点奶来平衡吗？", 3)]),

  topic("restaurant", "餐厅用餐", "🍽", "点菜 · 忌口 · 反馈", "你是食客，ChatGPT 是服务员。询问菜品、说明忌口，点餐并礼貌处理一个问题。",
    [item("menu", "菜单", 1, true), item("starter", "前菜", 1), item("main course", "主菜", 1), item("bill", "账单", 1), item("allergy", "过敏", 1), item("spicy", "辣的", 1), item("side dish", "配菜", 2), item("undercooked", "没熟透的", 2), item("service charge", "服务费", 2), item("cross-contamination", "交叉污染", 3)],
    [item("Could we see the menu?", "可以给我们菜单吗？", 1, true), item("I'll have…", "我要……", 1), item("Is this dish spicy?", "这道菜辣吗？", 1), item("Could we get the bill?", "可以结账吗？", 1), item("I'm allergic to…", "我对……过敏。", 2), item("Could we have this on the side?", "这个能单独放吗？", 2), item("This isn't quite what I ordered.", "这和我点的不太一样。", 2), item("How do you prevent cross-contamination?", "你们如何防止交叉污染？", 3)],
    [item("I'll have the chicken with a side salad.", "我要鸡肉，配一份沙拉。", 1), item("Could you leave out the onions, please?", "可以不放洋葱吗？", 1), item("The steak is a little undercooked for me.", "这份牛排对我来说有点没熟。", 2), item("Because of my allergy, I need to check every ingredient.", "因为过敏，我需要确认每种配料。", 2), item("Could you confirm whether the service charge is included?", "能确认账单里是否包含服务费吗？", 3), item("I'd appreciate a recommendation that avoids cross-contamination.", "希望你推荐一道能避免交叉污染的菜。", 3)]),

  topic("hotel", "酒店入住", "🛎", "入住 · 设施 · 换房", "你是旅客，ChatGPT 是酒店前台。完成入住，确认设施，并处理一个房间问题。",
    [item("reservation", "预订", 1, true), item("check-in", "入住", 1), item("check-out", "退房", 1), item("key card", "房卡", 1), item("breakfast", "早餐", 1), item("luggage", "行李", 1), item("deposit", "押金", 2), item("vacancy", "空房", 2), item("complimentary", "免费的", 2), item("late check-out", "延迟退房", 3)],
    [item("I have a reservation under…", "我用……的名字订了房。", 1, true), item("Is breakfast included?", "包含早餐吗？", 1), item("What time is check-out?", "几点退房？", 1), item("Could I leave my luggage here?", "我能寄存行李吗？", 1), item("Would it be possible to change rooms?", "可以换房间吗？", 2), item("The room seems a little noisy.", "房间好像有点吵。", 2), item("Could you waive the fee?", "可以免掉这项费用吗？", 3), item("Is a complimentary upgrade available?", "可以免费升级房型吗？", 3)],
    [item("I have a reservation under Chen.", "我用陈这个名字订了房。", 1), item("Could I store my luggage after check-out?", "退房后我能寄存行李吗？", 1), item("The air conditioning doesn't seem to be working.", "空调好像没有正常工作。", 2), item("If possible, I'd prefer a room away from the elevator.", "如果可以，我想要一间远离电梯的房间。", 2), item("Given the disruption, could you offer a late check-out?", "考虑到这次打扰，可以延迟退房吗？", 3), item("I'd be grateful if you could confirm the upgrade in writing.", "如果能书面确认升级，我会很感谢。", 3)]),

  topic("airport", "机场出行", "✈", "值机 · 安检 · 延误", "你是乘客，ChatGPT 是航空公司工作人员。办理值机、确认行李规定，并处理航班延误。",
    [item("boarding pass", "登机牌", 1, true), item("gate", "登机口", 1), item("carry-on", "随身行李", 1), item("checked baggage", "托运行李", 1), item("delay", "延误", 1), item("security", "安检", 1), item("layover", "转机停留", 2), item("connection", "转机航班", 2), item("overbooked", "超售的", 2), item("travel voucher", "旅行代金券", 3)],
    [item("Where is the check-in counter?", "值机柜台在哪里？", 1, true), item("Which gate should I go to?", "我该去哪个登机口？", 1), item("Can I take this as carry-on?", "这个可以随身携带吗？", 1), item("How long is the delay?", "航班延误多久？", 1), item("Will I make my connection?", "我能赶上转机吗？", 2), item("Could you put me on the next flight?", "能帮我改到下一班吗？", 2), item("What compensation am I entitled to?", "我可以获得什么补偿？", 3), item("Could you reroute me through another city?", "能帮我改成经另一座城市转机吗？", 3)],
    [item("I'd like to check in one suitcase.", "我想托运一个行李箱。", 1), item("Could you tell me when boarding starts?", "能告诉我什么时候开始登机吗？", 1), item("My flight is delayed, and I have a tight connection.", "我的航班延误了，而且转机时间很紧。", 2), item("If I miss the connection, please book me on the next flight.", "如果错过转机，请帮我订下一班。", 2), item("Since the flight is overbooked, what alternatives can you offer?", "既然航班超售，你们能提供什么替代方案？", 3), item("I'd prefer a rerouting option that gets me there tonight.", "我希望改签方案能让我今晚到达。", 3)]),

  topic("directions", "问路与地铁", "🚇", "路线 · 换乘 · 迷路", "你是游客，ChatGPT 是当地人或站务员。问清路线、确认换乘，并在走错后重新规划。",
    [item("station", "车站", 1, true), item("platform", "站台", 1), item("exit", "出口", 1), item("ticket", "车票", 1), item("block", "街区", 1), item("intersection", "十字路口", 1), item("transfer", "换乘", 2), item("fare", "票价", 2), item("landmark", "地标", 2), item("service disruption", "线路中断", 3)],
    [item("How do I get to…?", "我怎么去……？", 1, true), item("Is it far from here?", "离这里远吗？", 1), item("Which exit should I take?", "我该走哪个出口？", 1), item("Do I need to transfer?", "我需要换乘吗？", 2), item("Have I gone the wrong way?", "我是不是走错了？", 2), item("What's the fastest route?", "最快的路线是什么？", 2), item("Is there step-free access?", "有无障碍通道吗？", 3), item("Is the line affected by disruptions?", "这条线受线路中断影响吗？", 3)],
    [item("Take the second exit and turn left.", "走第二个出口，然后左转。", 1), item("The station is about two blocks away.", "车站大约在两个街区外。", 1), item("You'll need to transfer to Line 2 downtown.", "你需要在市中心换乘二号线。", 2), item("Could you point it out on the map?", "你能在地图上指出来吗？", 2), item("Because of the disruption, the bus may be quicker.", "由于线路中断，公交车可能更快。", 3), item("I'd prefer a route with step-free access, even if it takes longer.", "即使更久，我也想走有无障碍通道的路线。", 3)]),

  topic("doctor", "看医生", "🩺", "症状 · 病史 · 用药", "你是患者，ChatGPT 是医生。描述症状和持续时间，回答病史问题并确认下一步。",
    [item("pain", "疼痛", 1, true), item("fever", "发烧", 1), item("cough", "咳嗽", 1), item("headache", "头痛", 1), item("medicine", "药物", 1), item("allergy", "过敏", 1), item("symptom", "症状", 2), item("prescription", "处方", 2), item("side effect", "副作用", 2), item("medical history", "病史", 3)],
    [item("I've been feeling…", "我一直觉得……", 1, true), item("It hurts here.", "这里疼。", 1), item("How often should I take this?", "这个药多久吃一次？", 1), item("It started three days ago.", "三天前开始的。", 1), item("The pain gets worse when…", "当……时疼痛加重。", 2), item("Are there any side effects?", "有什么副作用吗？", 2), item("Could this interact with my medication?", "这会和我正在服用的药相互作用吗？", 3), item("Should I seek urgent care if it worsens?", "如果加重，我应该去急诊吗？", 3)],
    [item("I've had a cough for three days.", "我咳嗽三天了。", 1), item("I'm allergic to penicillin.", "我对青霉素过敏。", 1), item("The headache gets worse when I stand up.", "我站起来时头痛会加重。", 2), item("I haven't taken anything for it yet.", "我还没有为此服药。", 2), item("Could you explain how this fits with my medical history?", "能解释一下这和我的病史有什么关系吗？", 3), item("Please tell me which warning signs would require urgent care.", "请告诉我哪些警示症状需要紧急就医。", 3)]),

  topic("clothes", "买衣服", "👕", "尺码 · 试穿 · 退换", "你是顾客，ChatGPT 是店员。找合适的款式和尺码，试穿后决定购买或退换。",
    [item("size", "尺码", 1, true), item("fitting room", "试衣间", 1), item("receipt", "小票", 1), item("refund", "退款", 1), item("exchange", "换货", 1), item("material", "材质", 1), item("fit", "版型/合身度", 2), item("waist", "腰围", 2), item("shrink", "缩水", 2), item("alteration", "改衣", 3)],
    [item("Do you have this in…?", "这件有……吗？", 1, true), item("Can I try this on?", "我可以试穿吗？", 1), item("Where is the fitting room?", "试衣间在哪里？", 1), item("I'd like to return this.", "我想退掉这件。", 1), item("It's a little tight around the waist.", "腰部有点紧。", 2), item("Does this come in another color?", "这有其他颜色吗？", 2), item("Can this be altered?", "这件可以修改吗？", 3), item("How does the fabric hold up after washing?", "这种面料洗后耐穿吗？", 3)],
    [item("Do you have this shirt in a medium?", "这件衬衫有中码吗？", 1), item("I'd like to exchange it for another color.", "我想换成另一种颜色。", 1), item("The shoulders fit, but the sleeves are too long.", "肩部合适，但袖子太长。", 2), item("If it shrinks in the wash, it may be too small.", "如果洗后缩水，可能会太小。", 2), item("I'd buy it if the sleeves could be altered.", "如果袖子能改，我就会买。", 3), item("Could you recommend a fabric that keeps its shape?", "能推荐一种不易变形的面料吗？", 3)]),

  topic("haircut", "国外理发", "✂", "长度 · 层次 · 造型", "你是顾客，ChatGPT 是理发师。说明想保留的长度、参考风格，并在过程中确认细节。",
    [item("trim", "修剪", 1, true), item("bangs", "刘海", 1), item("sides", "两侧", 1), item("length", "长度", 1), item("layers", "层次", 1), item("shampoo", "洗发", 1), item("taper", "渐短", 2), item("texture", "纹理感", 2), item("parting", "分缝", 2), item("thinning shears", "打薄剪", 3)],
    [item("Just a trim, please.", "只修剪一下。", 1, true), item("Not too short on the sides.", "两侧不要太短。", 1), item("I'd like to keep the length.", "我想保留长度。", 1), item("Could you add some layers?", "可以增加一些层次吗？", 2), item("How much are you taking off?", "你准备剪掉多少？", 2), item("Could you blend the sides more?", "两侧能衔接得更自然吗？", 2), item("I'd like a softer, more textured finish.", "我想要更柔和、更有纹理的效果。", 3), item("Please avoid thinning out the crown.", "头顶区域请不要打薄。", 3)],
    [item("I'd like about two centimeters off.", "我想剪掉大约两厘米。", 1), item("Please keep the front long enough to style.", "前面请留到可以做造型的长度。", 1), item("Could you taper the sides without exposing too much scalp?", "两侧可以渐短，但不要露太多头皮吗？", 2), item("The reference photo is close, but I'd like less volume.", "参考图很接近，但我想少一点蓬松感。", 2), item("I'd prefer the layers to frame my face rather than add volume.", "我希望层次修饰脸型，而不是增加蓬松度。", 3), item("Before using thinning shears, could you show me where you'll use them?", "使用打薄剪前，能告诉我会剪哪里吗？", 3)]),

  topic("small-talk", "轻松社交", "👋", "认识 · 延续 · 告别", "你在朋友聚会遇到陌生人。自然开启、延续并结束一段有来有往的闲聊。",
    [item("hobby", "爱好", 1, true), item("weekend", "周末", 1), item("neighborhood", "社区", 1), item("host", "主人/主办者", 1), item("invitation", "邀请", 1), item("trip", "旅行", 1), item("mutual friend", "共同朋友", 2), item("common ground", "共同点", 2), item("small talk", "闲聊", 2), item("rapport", "融洽关系", 3)],
    [item("How do you know…?", "你怎么认识……的？", 1, true), item("What do you do for fun?", "你平时有什么爱好？", 1), item("That sounds like fun.", "听起来很有意思。", 1), item("How did you get into it?", "你怎么开始接触它的？", 2), item("What have you been up to lately?", "你最近在忙什么？", 2), item("Speaking of which…", "说到这个……", 2), item("I can definitely relate to that.", "我对此很有共鸣。", 3), item("I should mingle, but it was lovely talking.", "我该去和别人聊聊了，很高兴和你交谈。", 3)],
    [item("How do you know the host?", "你怎么认识主人的？", 1), item("I've always wanted to try that.", "我一直想试试那个。", 1), item("I got into photography during a trip last year.", "我去年旅行时开始接触摄影。", 2), item("We seem to have a lot in common.", "我们似乎有很多共同点。", 2), item("That reminds me of something similar that happened to me.", "这让我想起发生在我身上的类似经历。", 3), item("I don't want to monopolize you, so I'll let you mingle.", "我不想一直占用你的时间，你去和大家聊吧。", 3)]),

  topic("work-meeting", "工作会议", "🗒", "汇报 · 澄清 · 协商", "你是项目成员，ChatGPT 是同事。汇报进展、说明风险，并就下一步和负责人达成一致。",
    [item("deadline", "截止日期", 1, true), item("update", "进展更新", 1), item("task", "任务", 1), item("issue", "问题", 1), item("next step", "下一步", 1), item("owner", "负责人", 1), item("blocker", "阻碍因素", 2), item("priority", "优先级", 2), item("trade-off", "权衡", 2), item("dependency", "依赖项", 3)],
    [item("Here's where we are…", "目前进展是……", 1, true), item("The main issue is…", "主要问题是……", 1), item("What's the next step?", "下一步是什么？", 1), item("We're on track to…", "我们有望按计划……", 2), item("Could you clarify what you mean by…?", "能说明一下你说的……吗？", 2), item("I see your point, but…", "我理解你的观点，不过……", 2), item("We need to weigh the trade-offs.", "我们需要权衡利弊。", 3), item("This depends on the design sign-off.", "这取决于设计确认。", 3)],
    [item("We're on track to finish by Friday.", "我们有望在周五前完成。", 1), item("I'll send an update after the meeting.", "会后我会发进展更新。", 1), item("The main blocker is the missing customer data.", "主要阻碍是缺少客户数据。", 2), item("If we change the scope, we'll need a new deadline.", "如果改变范围，就需要新的截止日期。", 2), item("Given the dependency, I'd prioritize reliability over speed.", "考虑到依赖关系，我会把可靠性置于速度之上。", 3), item("Before we commit, let's make the trade-off explicit.", "在承诺之前，我们先明确这项权衡。", 3)]),

  topic("job-interview", "英文面试", "💼", "经历 · 能力 · 追问", "你是求职者，ChatGPT 是面试官。介绍经历，用实例证明能力，并针对岗位提出问题。",
    [item("experience", "经历", 1, true), item("skill", "技能", 1), item("strength", "优势", 1), item("team", "团队", 1), item("project", "项目", 1), item("result", "结果", 1), item("achievement", "成就", 2), item("challenge", "挑战", 2), item("responsibility", "职责", 2), item("stakeholder", "利益相关方", 3)],
    [item("I have experience in…", "我有……方面的经验。", 1, true), item("My main strength is…", "我的主要优势是……", 1), item("I was responsible for…", "我负责……", 2), item("A good example would be…", "一个很好的例子是……", 2), item("The result was…", "结果是……", 2), item("What does success look like in this role?", "这个岗位成功的标准是什么？", 2), item("I aligned multiple stakeholders around…", "我协调多个相关方就……达成一致。", 3), item("The experience sharpened my ability to…", "这段经历提升了我……的能力。", 3)],
    [item("I have three years of experience in customer support.", "我有三年客户支持经验。", 1), item("My main strength is solving problems calmly.", "我的主要优势是冷静解决问题。", 1), item("When the project slipped, I reorganized the weekly plan.", "项目延期时，我重排了每周计划。", 2), item("As a result, we delivered the launch on time.", "结果，我们按时完成了发布。", 2), item("I persuaded competing stakeholders to agree on one measurable goal.", "我说服诉求不同的相关方就一个可衡量目标达成一致。", 3), item("What would you expect me to accomplish in the first ninety days?", "你希望我入职前三个月取得什么成果？", 3)])
];

const DURATIONS = [5, 10, 20, 40];
const LEVELS = [["beginner", "入门"], ["intermediate", "中级"], ["advanced", "进阶"]];
const HINTS = [["immersion", "沉浸"], ["guided", "引导"], ["learning", "学习"]];
const TIME_COPY = {
  5: "只练一个关键任务，随手开口也算完成。",
  10: "走完一轮真实交流，顺手修正一个表达。",
  20: "完整走一遍场景，再处理一个小意外。",
  40: "多阶段深练，并把学过的表达迁移到新情况。"
};

let state = { version: 1, preferences: { level: "intermediate", hint_mode: "guided" }, sessions: [] };
let selection = { topic: TOPICS[0], duration: 20, level: "intermediate", hint: "guided" };
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));

function choiceButton(value, label, selected, group) {
  return `<button class="choice-button ${selected ? "selected" : ""}" data-${group}="${escapeHtml(value)}" aria-pressed="${selected}">${escapeHtml(label)}</button>`;
}

function renderControls() {
  $("#topics").innerHTML = TOPICS.map(topic => `
    <button class="topic-card ${selection.topic.id === topic.id ? "selected" : ""}" data-topic="${topic.id}" aria-pressed="${selection.topic.id === topic.id}">
      <span class="emoji">${topic.emoji}</span><b>${topic.label}</b><small>${topic.sub}</small>
    </button>`).join("");
  $("#duration-options").innerHTML = DURATIONS.map(value => choiceButton(value, `${value} 分钟`, selection.duration === value, "duration")).join("");
  $("#level-options").innerHTML = LEVELS.map(([value,label]) => choiceButton(value, label, selection.level === value, "level")).join("");
  $("#hint-options").innerHTML = HINTS.map(([value,label]) => choiceButton(value, label, selection.hint === value, "hint")).join("");
  $("#time-description").textContent = TIME_COPY[selection.duration];
}

function bindControlEvents() {
  $("#topics").addEventListener("click", event => {
    const button = event.target.closest("[data-topic]"); if (!button) return;
    selection.topic = TOPICS.find(topic => topic.id === button.dataset.topic);
    $("#custom-topic").value = ""; renderControls();
  });
  $("#duration-options").addEventListener("click", event => {
    const button = event.target.closest("[data-duration]"); if (!button) return;
    selection.duration = Number(button.dataset.duration); renderControls();
  });
  $("#level-options").addEventListener("click", event => {
    const button = event.target.closest("[data-level]"); if (!button) return;
    selection.level = button.dataset.level; renderControls();
  });
  $("#hint-options").addEventListener("click", event => {
    const button = event.target.closest("[data-hint]"); if (!button) return;
    selection.hint = button.dataset.hint; renderControls();
  });
}

function customTopic() {
  const label = $("#custom-topic").value.trim();
  if (!label) return selection.topic;
  return {
    id: "custom", label, emoji: "✎", sub: "自定义",
    mission: `围绕“${label}”完成一段真实角色扮演，由教练确定合理的双方角色、任务和一个小意外。`,
    words: [item("option", "选择", 1, true), item("price", "价格", 1), item("time", "时间", 1), item("place", "地点", 1), item("problem", "问题", 1), item("help", "帮助", 1), item("alternative", "替代方案", 2), item("requirement", "要求", 2), item("preference", "偏好", 2), item("constraint", "限制条件", 3)],
    phrases: [item("Could you help me with…?", "你能帮我处理……吗？", 1, true), item("What would you recommend?", "你会推荐什么？", 1), item("That works for me.", "这样我可以。", 1), item("Could you say that again?", "你能再说一次吗？", 1), item("What I mean is…", "我的意思是……", 2), item("Would it be possible to…?", "可以……吗？", 2), item("My main concern is…", "我主要担心的是……", 3), item("Could we explore another option?", "我们可以考虑另一个选择吗？", 3)],
    sentences: [item(`I need some help with ${label}.`, `我需要一些关于“${label}”的帮助。`, 1), item("Could you explain the options to me?", "你能给我解释一下有哪些选择吗？", 1), item("I'd prefer something simple and practical.", "我更喜欢简单实用的方案。", 2), item("If that isn't available, what would you suggest instead?", "如果那个没有，你建议用什么替代？", 2), item("My main concern is finding an option that fits my needs.", "我主要担心的是找到符合需求的选择。", 3), item("Before I decide, I'd like to understand the trade-offs.", "决定前，我想先了解其中的取舍。", 3)]
  };
}

const CARD_SCALE = {
  5: { words: 2, phrases: 2, sentences: 1, challenge: 2 },
  10: { words: 4, phrases: 3, sentences: 2, challenge: 4 },
  20: { words: 6, phrases: 5, sentences: 3, challenge: 6 },
  40: { words: 8, phrases: 7, sentences: 5, challenge: 9 }
};
function cardScale() {
  if (CARD_SCALE[selection.duration]) return CARD_SCALE[selection.duration];
  if (selection.duration < 10) return CARD_SCALE[5];
  if (selection.duration < 20) return CARD_SCALE[10];
  if (selection.duration < 40) return CARD_SCALE[20];
  return CARD_SCALE[40];
}

async function copySessionPrompt() {
  const topic = customTopic();
  selection.topic = topic;
  state.preferences = { level: selection.level, hint_mode: selection.hint, duration: selection.duration, topic_id: topic.id };
  saveState();
  await copyPrompt();
}

function makePrompt() {
  const topic = customTopic();
  const scale = cardScale();
  return `请使用 $kouyu 为我开始一次英语口语训练。\n主题：${topic.label}\n时间：${selection.duration} 分钟\n程度：${selection.level}\n中文辅助：${selection.hint}\n\n请先给我一张内容充足、与时长明显匹配的预习卡，分开列出至少 ${scale.words} 个重点单词、${scale.phrases} 个实用词组和 ${scale.sentences} 个完整例句。词汇必须贴合“${topic.label}”的真实场景；如果有专业术语，请按我的程度选择，避免只给通用寒暄。语音角色扮演中，如果问题是为了引出某个目标表达，请用中文简短说明我应该往什么方向回答，但不要直接给出英文答案；如果我仍然卡住，再逐级提供关键词和完整示范。结束后请生成学习报告并存入复习台。`;
}

async function copyPrompt() {
  const prompt = makePrompt();
  try {
    await navigator.clipboard.writeText(prompt);
  } catch {
    const area = document.createElement("textarea"); area.value = prompt; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
  }
  showToast("练习指令已复制，可以去开启语音啦 ☻");
}

function showToast(message) {
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("show");
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

async function loadState() {
  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    if (!response.ok) throw new Error("not connected");
    state = await response.json();
    $("#save-status").textContent = "本地工作台已连接";
  } catch {
    $("#save-status").textContent = "预览模式 · 暂未连接存档";
  }
  selection.level = state.preferences?.level || selection.level;
  selection.hint = state.preferences?.hint_mode || selection.hint;
  selection.duration = state.preferences?.duration || selection.duration;
  const storedTopic = TOPICS.find(topic => topic.id === state.preferences?.topic_id);
  if (storedTopic) selection.topic = storedTopic;
  renderControls(); renderReview();
}

async function saveState() {
  try {
    const response = await fetch("/api/state", { method: "PUT", headers: {"Content-Type":"application/json"}, body: JSON.stringify(state) });
    if (!response.ok) throw new Error("save failed");
    $("#save-status").textContent = "选择已保存";
  } catch { $("#save-status").textContent = "预览模式 · 选择未存档"; }
}

function switchView(view) {
  $$(".view").forEach(item => item.classList.toggle("active", item.id === `${view}-view`));
  $$(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === view));
  history.replaceState(null, "", `#${view}`);
  if (view === "review") renderReview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderReview() {
  const sessions = [...(state.sessions || [])].sort((a,b) => String(b.created_at).localeCompare(String(a.created_at)));
  const targets = sessions.flatMap(session => session.targets || []);
  const mastered = targets.filter(target => target.status === "mastered").length;
  const review = targets.filter(target => target.status === "needs_review").length;
  $("#stat-sessions").textContent = sessions.length;
  $("#stat-mastered").textContent = mastered;
  $("#stat-review").textContent = review;
  $("#session-count").textContent = sessions.length ? `已经开口 ${sessions.length} 次` : "从第 1 次开始";
  $("#empty-review").classList.toggle("hidden", sessions.length > 0);
  const grouped = sessions.reduce((map, session) => {
    const key = session.topic?.id || "other"; (map[key] ||= []).push(session); return map;
  }, {});
  $("#review-list").innerHTML = Object.values(grouped).map(items => {
    const latest = items[0]; const allTargets = items.flatMap(item => item.targets || []);
    const done = allTargets.filter(target => target.status === "mastered").length;
    const percent = allTargets.length ? Math.round(done / allTargets.length * 100) : 0;
    const tags = allTargets.slice(0, 10).map(target => {
      const kind = target.status === "needs_review" ? "review" : target.status === "developing" ? "developing" : "";
      return `<span class="target-tag ${kind}">${escapeHtml(target.expression)}</span>`;
    }).join("");
    return `<article class="review-topic paper-card">
      <div class="review-topic-header"><h2>${escapeHtml(latest.topic?.emoji || "💬")} ${escapeHtml(latest.topic?.label || "口语练习")}</h2><div class="progress" title="掌握 ${percent}%"><i style="width:${percent}%"></i></div></div>
      <p class="review-meta">练过 ${items.length} 次 · 已掌握 ${done}/${allTargets.length} · 最近 ${escapeHtml(formatDate(latest.created_at))}</p>
      <div class="target-tags">${tags || "<span class='target-tag developing'>等待本次表达记录</span>"}</div>
    </article>`;
  }).join("");
}

function formatDate(value) {
  const date = new Date(value); return Number.isNaN(date.getTime()) ? String(value || "") : new Intl.DateTimeFormat("zh-CN", {month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(date);
}

function init() {
  renderControls(); bindControlEvents(); loadState();
  $$(".nav-item").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
  $$('[data-go-practice]').forEach(button => button.addEventListener("click", () => switchView("practice")));
  $("#build-card").addEventListener("click", copySessionPrompt);
  $("#custom-topic").addEventListener("keydown", event => { if (event.key === "Enter") copySessionPrompt(); });
  switchView(location.hash === "#review" ? "review" : "practice");
}

init();
