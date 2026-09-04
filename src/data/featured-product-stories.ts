export type LocalizedCopy = {ja: string; en: string};

export type ProductStoryPage = {
  kicker: LocalizedCopy;
  title: LocalizedCopy;
  body: LocalizedCopy;
  image?: string;
  imageAlt?: LocalizedCopy;
  imageClassName?: string;
  videoId?: string;
  videoTitle?: LocalizedCopy;
  dark?: boolean;
  specs?: {label: LocalizedCopy; value: LocalizedCopy}[];
  related?: boolean;
};

export type RelatedProduct = {
  name: LocalizedCopy;
  image: string;
  href: string;
};

export type FeaturedProductStory = {
  slug: string;
  title: LocalizedCopy;
  description: LocalizedCopy;
  image: string;
  storeUrl: string;
  pages: ProductStoryPage[];
  relatedProducts: RelatedProduct[];
};

const copy = (ja: string, en: string): LocalizedCopy => ({ja, en});

export const featuredProductStories: FeaturedProductStory[] = [
  {
    slug: "knife-friendly-black-cutting-board",
    title: copy("包丁にやさしいまな板 黒", "KAMA-ASA’s Knife Friendly Black Cutting Board"),
    description: copy("刃当たりのやさしさと、食材の見やすさを両立した釜浅商店の黒いまな板。", "A black cutting board designed for a gentle edge, stable prep and clear visibility."),
    image: "/images/kamaasa/featured/cutting-board-black.jpg",
    storeUrl: "https://kama-asa.co.jp/en-us/products/kama-asa-black-cutting-board",
    relatedProducts: [
      {name: copy("amane ペティナイフ", "amane Utility Knife"), image: "/images/kamaasa/related/amane-utility-knife.jpg", href: "https://kama-asa.co.jp/en-us/products/amane-petli"},
      {name: copy("amane 牛刀", "amane Chef knife"), image: "/images/kamaasa/related/amane-chef-knife.jpg", href: "https://kama-asa.co.jp/en-us/products/amane-gyuto"},
      {name: copy("amane 三徳 175mm", "amane Santoku 175mm"), image: "/images/kamaasa/amane/amane-santoku.jpg", href: "https://kama-asa.co.jp/en-us/products/amane-santoku"}
    ],
    pages: [
      {
        kicker: copy("KAMA-ASA ORIGINAL", "KAMA-ASA ORIGINAL"),
        title: copy("包丁にやさしいまな板 黒", "Knife Friendly Black Cutting Board"),
        body: copy("毎日使う包丁の切れ味を、まな板から守る。やわらかな刃当たりと、プロの厨房にもなじむ黒をひとつにしました。", "Protect the edge of the knife you use every day. A softly resilient surface meets a purposeful black made for focused prep."),
        image: "/images/kamaasa/featured/cutting-board-black.jpg",
        imageAlt: copy("包丁にやさしいまな板 黒", "KAMA-ASA black cutting board"),
        imageClassName: "object-cover object-center"
      },
      {
        kicker: copy("POINT 01", "POINT 01"),
        title: copy("切れ味を受け止める、やわらかなEVA。", "A soft EVA surface that receives the edge."),
        body: copy("適度な弾力を持つEVA素材が刃先をやさしく受け止め、包丁が鈍るのを抑えます。厚さ2cmの安定感とクッション性が、長い仕込みも支えます。", "Resilient EVA cushions the blade and helps preserve sharpness. Its 2 cm thickness adds stability and comfort through longer sessions of prep."),
        image: "/images/kamaasa/featured/cutting-board-black.jpg",
        imageAlt: copy("黒いまな板の表面", "Surface of the black cutting board"),
        imageClassName: "object-cover object-[58%_center] scale-[1.22]"
      },
      {
        kicker: copy("POINT 02", "POINT 02"),
        title: copy("黒だから、食材がよく見える。", "Black makes every ingredient easier to see."),
        body: copy("白い食材や細かな異物まで見分けやすい黒。作業面のコントラストを高め、料理のリズムを止めずに、確かな確認へつなげます。", "The dark surface increases contrast—from pale ingredients to small foreign objects—making each movement and visual check more assured."),
        dark: true
      },
      {
        kicker: copy("CARE", "CARE"),
        title: copy("清潔に保ち、平らに休ませる。", "Keep it clean, then let it rest flat."),
        body: copy("漂白剤は使用できます。熱湯、食器洗浄機、火のそばは避け、洗浄後は水分を拭き取って平らな場所で保管してください。耐熱温度は70℃です。", "Bleach may be used. Avoid boiling water, dishwashers and direct heat; dry after washing and store flat. Heat resistance is 70°C."),
        image: "/images/kamaasa/featured/cutting-board-black.jpg",
        imageAlt: copy("黒いまな板", "Black cutting board"),
        imageClassName: "object-cover object-left"
      },
      {
        kicker: copy("SPECIFICATION", "SPECIFICATION"),
        title: copy("料理と場所に合わせて、四つの大きさ。", "Four sizes for different kitchens and tasks."),
        body: copy("家庭の小さな仕込みから広い作業台まで。使う量と置く場所から、無理のない一枚を選べます。", "From compact home prep to a broad professional worktop, choose the size that fits both the food and the space."),
        specs: [
          {label: copy("S", "S"), value: copy("30 × 20 × 2cm", "30 × 20 × 2 cm")},
          {label: copy("M", "M"), value: copy("40 × 25 × 2cm", "40 × 25 × 2 cm")},
          {label: copy("L", "L"), value: copy("50 × 30 × 2cm", "50 × 30 × 2 cm")},
          {label: copy("XL", "XL"), value: copy("60 × 35 × 2cm", "60 × 35 × 2 cm")},
          {label: copy("素材", "Material"), value: copy("EVA", "EVA")},
          {label: copy("産地", "Origin"), value: copy("岡山県", "Okayama, Japan")}
        ]
      },
      {kicker: copy("RELATED PRODUCTS", "RELATED PRODUCTS"), title: copy("まな板に合わせる、次の一本。", "Choose the next knife for this worktop."), body: copy("果物や薬味の細かな作業に向くペティナイフから、日々の主役になる三徳・牛刀まで。黒いまな板と使いたい三本です。", "From a utility knife for fruit and fine work to Santoku and Chef knife for daily preparation—three blades suited to the black board."), related: true}
    ]
  },
  {
    slug: "hammered-iron-frying-pan-26cm",
    title: copy("釜浅の鉄打出しフライパン 26cm", "KAMA-ASA’s Hammered Iron Frying Pan 26cm"),
    description: copy("2.3mm厚の鉄と打出しの技で、食材のおいしさを引き出す釜浅商店オリジナルのフライパン。", "KAMA-ASA's original 2.3 mm hammered iron pan, designed to hold steady heat and bring out flavor."),
    image: "/images/kamaasa/featured/frying-pan-product.jpg",
    storeUrl: "https://kama-asa.co.jp/en-us/products/kama-asas-hammered-iron-fryingpan-26cm",
    relatedProducts: [
      {name: copy("釜浅の鉄打出しフライパン 20cm", "Hammered Carbon Steel Frying Pan 20cm"), image: "/images/kamaasa/related/frying-pan-20.jpg", href: "https://kama-asa.co.jp/en/products/kama-asas-hammered-iron-fryingpan-20cm"},
      {name: copy("鉄打出しフライパン 26cm専用蓋", "Lid for Hammered Frying Pan 26cm"), image: "/images/kamaasa/related/frying-pan-lid.jpg", href: "https://kama-asa.co.jp/en/products/lid-for-kama-asas-hammered-iron-frying-pan-26cm"},
      {name: copy("釜浅の鉄両手フライパン", "Double Handle Carbon Steel Frying Pan"), image: "/images/kamaasa/related/double-handle-frying-pan.jpg", href: "https://kama-asa.co.jp/en/products/kama-asas-hammered-double-handle-iron-frying-pan-22cm-24cm"}
    ],
    pages: [
      {kicker: copy("KAMA-ASA ORIGINAL", "KAMA-ASA ORIGINAL"), title: copy("釜浅の鉄打出しフライパン 26cm", "Hammered Iron Frying Pan 26cm"), body: copy("焼き目は香ばしく、中はみずみずしく。火と食材の間に、厚い鉄を置くという選択です。", "Deep color outside, moisture held within. A substantial layer of iron mediates between flame and ingredient."), image: "/images/kamaasa/featured/frying-pan-product.jpg", imageAlt: copy("釜浅の鉄打出しフライパン", "KAMA-ASA hammered iron frying pan"), imageClassName: "object-cover object-center"},
      {kicker: copy("MOVIE", "MOVIE"), title: copy("音と湯気で、鉄の仕事を見る。", "See the iron at work—in sound and steam."), body: copy("実際の火入れを通して、厚い鉄がつくる焼き色と、調理のテンポを確かめます。", "Watch the color, motion and pace made possible by a substantial hammered-iron pan."), videoId: "r-SxF47Cqkg", videoTitle: copy("釜浅の鉄打出しフライパン", "KAMA-ASA hammered iron frying pan"), dark: true},
      {kicker: copy("POINT 01", "POINT 01"), title: copy("2.3mmの鉄が、熱を穏やかに蓄える。", "2.3 mm of iron holds heat steadily."), body: copy("厚い鉄板は食材を入れても温度が落ちにくく、熱を穏やかに伝えます。表面をカリッと焼き、中はみずみずしく。食材の旨みを逃さず、安定した温度で焼き上げます。", "The thick plate resists temperature loss as food is added. It builds a crisp surface while keeping the center succulent, holding a steady temperature that brings out the ingredient's flavor."), image: "/images/kamaasa/featured/frying-pan-steak.jpg", imageAlt: copy("鉄フライパンで焼いたステーキ", "Steak cooked in the iron frying pan"), imageClassName: "object-cover object-center"},
      {kicker: copy("POINT 02", "POINT 02"), title: copy("握りやすく、洗いやすい一体のかたち。", "A grip designed to hold—and a form made to wash."), body: copy("細く平らなオリジナルハンドルは手の大きさを選ばず握りやすく、鍋の底に近い位置で蓋とも干渉しにくい設計。溶接接合で内側に鋲がなく、手入れもすっきり行えます。", "The slim flat handle is easy to grip and sits close to the base to make room for a lid. A welded joint leaves the cooking surface free of rivets and easier to clean."), image: "/images/kamaasa/featured/frying-pan-product.jpg", imageAlt: copy("鉄フライパンの取手", "Handle of the iron frying pan"), imageClassName: "object-cover object-[35%_center] scale-[1.2]"},
      {kicker: copy("POINT 03", "POINT 03"), title: copy("空焼きの手間を、最初からなくす。", "No wax to burn off before first use."), body: copy("一般的な山田工業所の鉄製品に使われる防錆塗装の代わりに、防錆紙で包む釜浅商店仕様。購入後の空焼きが不要で、洗って油ならしをすれば使い始められます。", "KAMA-ASA replaces the usual anti-rust wax with protective paper. There is no coating to burn off: wash the pan, season it with oil and begin cooking."), dark: true},
      {kicker: copy("CARE", "CARE"), title: copy("油を育て、使ったら火で乾かす。", "Build the oil layer, then dry with heat."), body: copy("初回のみ中性洗剤で洗い、油ならしをして使用します。普段は水かお湯とたわしで洗い、水分を火にかけて飛ばします。山田工業所の打出しによる細かな凹凸に油がなじみ、使うほど扱いやすい鍋肌へ育ちます。", "Wash once with mild detergent, season with oil, then clean routinely with water and a brush. Dry over gentle heat; oil settles into the hammered surface and makes the pan increasingly dependable."), specs: [{label: copy("つくり手", "Maker"), value: copy("山田工業所", "YAMADA KOGYOSHO")},{label: copy("直径", "Diameter"), value: copy("26cm", "26 cm")},{label: copy("全長", "Total length"), value: copy("52cm", "52 cm")},{label: copy("厚さ", "Thickness"), value: copy("2.3mm", "2.3 mm")},{label: copy("重さ", "Weight"), value: copy("約1,300g", "Approx. 1,300 g")},{label: copy("熱源", "Heat source"), value: copy("ガス・IH", "Gas / induction")},{label: copy("産地", "Origin"), value: copy("神奈川県", "Kanagawa, Japan")}]},
      {kicker: copy("RELATED PRODUCTS", "RELATED PRODUCTS"), title: copy("同じ鉄を、用途に合わせて。", "Choose the iron pan that fits the task."), body: copy("小回りの利く20cm、26cm専用蓋、オーブンから食卓へ運べる両手型。同じ鉄の個性を、料理に合わせて選べます。", "A nimble 20 cm pan, the fitted 26 cm lid and a double-handle pan that moves from oven to table—three ways to work with iron."), related: true}
    ]
  },
  {
    slug: "yamada-hammered-carbon-steel-wok",
    title: copy("打出し中華鍋 1.6mm厚", "YAMADA Hammered Carbon Steel Wok (Thickness 1.6mm)"),
    description: copy("数千回の打出しで強く締められた、山田工業所の中華鍋。", "A 1.6 mm carbon-steel wok strengthened and shaped by thousands of hammer strikes."),
    image: "/images/kamaasa/featured/peking-wok-cropped.png",
    storeUrl: "https://kama-asa.co.jp/en-us/products/hammered-single-handle-wok-size-270-300mm",
    relatedProducts: [
      {name: copy("打出し中華鍋 1.2mm厚", "YAMADA Hammered Carbon Steel Wok 1.2mm"), image: "/images/kamaasa/related/wok-12.jpg", href: "https://kama-asa.co.jp/en/products/hammered-flat-bottomed-single-handle-wok-1-2mm"},
      {name: copy("IH対応 打出し中華鍋 1.6mm厚", "YAMADA Flat-Bottomed Carbon Steel Wok 1.6mm"), image: "/images/kamaasa/related/wok-flat-bottom.jpg", href: "https://kama-asa.co.jp/en/products/hammered-flat-bottomed-single-handle-wok-size-270-330mm"}
    ],
    pages: [
      {kicker: copy("YAMADA KOGYOSHO", "YAMADA KOGYOSHO"), title: copy("打出し中華鍋 1.6mm厚", "Hammered Carbon Steel Wok 1.6mm"), body: copy("振る、煽る、熱を回す。丸い底と深さが、炒める動きをそのまま料理へ変えます。", "Toss, turn and move the heat. A round base and generous depth translate motion directly into cooking."), image: "/images/kamaasa/featured/peking-wok-cropped.png", imageAlt: copy("山田工業所の打出し中華鍋", "YAMADA hammered carbon steel wok"), imageClassName: "object-contain object-center"},
      {kicker: copy("MOVIE 01", "MOVIE 01"), title: copy("中華鍋で、チャーハンを。", "Fried rice in a YAMADA wok."), body: copy("高温を保つ1.6mm厚と、返しやすい丸底。食材が鍋肌を走る動きを映像で見ます。", "See how 1.6 mm steel holds high heat while the round bottom keeps every ingredient in motion."), videoId: "CjUcqHkQPr8", videoTitle: copy("山田工業所の中華鍋でチャーハン", "Fried rice with YAMADA KOGYOSHO's wok"), dark: true},
      {kicker: copy("MOVIE 02", "MOVIE 02"), title: copy("使う前の準備と、毎日の洗い方。", "Seasoning first, then everyday care."), body: copy("油ならしから洗浄、乾燥まで。鉄を錆びさせず、油の膜を育てる基本を確かめます。", "From first seasoning to washing and drying, learn the routine that protects the steel and builds its working surface."), videoId: "dZVh0EwjcEU", videoTitle: copy("中華鍋の使用前準備と洗い方", "Preparing and caring for a carbon steel wok"), dark: true},
      {kicker: copy("POINT 01", "POINT 01"), title: copy("数千回の打出しが、鉄を強くする。", "Thousands of strikes strengthen the iron."), body: copy("山田工業所が一枚の鉄板を数千回叩き締めて形づくる打出し製法。丈夫さを高めながら生まれる細かな凹凸には油がなじみ、使うほど自分の鍋肌へ育ちます。", "YAMADA KOGYOSHO shapes a single sheet with thousands of hammer strikes. The process strengthens the steel and leaves fine irregularities that take on oil and mature through use."), image: "/images/kamaasa/featured/peking-wok-cropped.png", imageAlt: copy("打出しの鍋肌", "Hammered surface of the wok"), imageClassName: "object-contain object-center scale-[1.12]"},
      {kicker: copy("POINT 02", "POINT 02"), title: copy("炒めるだけではない、深さの道具。", "More than stir-frying—the depth expands the work."), body: copy("高温の炒め物はもちろん、深さを活かして揚げる、茹でるまで。一つの鍋で火の使い方を大きく広げられます。", "Beyond high-heat stir-frying, the depth supports deep-frying and boiling, broadening what one piece of cookware can do."), specs: [{label: copy("サイズ", "Sizes"), value: copy("24 / 27 / 30 / 33cm", "24 / 27 / 30 / 33 cm")},{label: copy("厚さ", "Thickness"), value: copy("1.6mm", "1.6 mm")},{label: copy("30cm重量", "30 cm weight"), value: copy("約1,300g", "Approx. 1,300 g")},{label: copy("熱源", "Heat source"), value: copy("ガス専用", "Gas only")},{label: copy("素材", "Material"), value: copy("黒皮鉄", "Black iron")},{label: copy("産地", "Origin"), value: copy("神奈川県", "Kanagawa, Japan")}]},
      {kicker: copy("RELATED PRODUCTS", "RELATED PRODUCTS"), title: copy("重さと熱源から、中華鍋を選ぶ。", "Choose a wok by weight and heat source."), body: copy("軽快に振れる1.2mm厚と、IHにも対応する平底1.6mm厚。使う火と料理の量から、次の一枚を選べます。", "Compare a lighter 1.2 mm wok with a flat-bottomed 1.6 mm model for induction, then choose around your heat source and cooking volume."), related: true}
    ]
  },
  {
    slug: "brass-handle-copper-egg-roll-pan",
    title: copy("真鍮取手玉子焼器 関西型", "Brass-Handle Copper egg roll Pan (Kansai Style)"),
    description: copy("1.5mm厚の銅と真鍮取手で、ふっくらした玉子焼きをつくる関西型玉子焼器。", "A professional 1.5 mm copper egg roll pan with a durable brass handle."),
    image: "/images/kamaasa/featured/tamagoyaki-pan.jpeg",
    storeUrl: "https://kama-asa.co.jp/en/products/shinchu-totte-tamago-yakiki-kansai",
    relatedProducts: [
      {name: copy("銅玉子焼器 関西型", "Copper Rolled Omelette Pan (Kansai-style)"), image: "/images/kamaasa/related/egg-pan-kansai.jpg", href: "https://kama-asa.co.jp/en/products/copper-egg-roll-pan-kansai-style-12cm"},
      {name: copy("銅玉子焼器 関東型", "Copper Tamagoyaki Pan (Kanto-style)"), image: "/images/kamaasa/related/egg-pan-kanto.jpg", href: "https://kama-asa.co.jp/en/products/copper-egg-roll-pan-kanto-style-size-15cm-21cm"},
      {name: copy("銅玉子焼器 関西型用蓋", "Lid for Copper Omelette Pan"), image: "/images/kamaasa/related/egg-pan-lid.jpg", href: "https://kama-asa.co.jp/en/products/lid-for-copper-rolled-omelette-pan-kansai-style"}
    ],
    pages: [
      {kicker: copy("COPPER / BRASS", "COPPER / BRASS"), title: copy("真鍮取手玉子焼器 関西型", "Brass-Handle Copper egg roll Pan"), body: copy("銅がすばやく熱を渡し、真鍮の取手が長く支える。ふっくらした玉子焼きのための、端正な四角です。", "Copper passes heat quickly; brass supports the tool for years. A precise rectangle shaped for a soft, layered omelette."), image: "/images/kamaasa/featured/tamagoyaki-pan.jpeg", imageAlt: copy("真鍮取手玉子焼器", "Brass-handle copper egg roll pan"), imageClassName: "object-cover object-center"},
      {kicker: copy("MOVIE 01", "MOVIE 01"), title: copy("銅玉子焼器の使い方。", "How to use a copper tamagoyaki pan."), body: copy("油の引き方、卵の流し方、層の返し方。道具を気持ちよく使い始めるための流れを映像で。", "Watch the rhythm of oiling, pouring and rolling—the essential sequence for working comfortably with copper."), videoId: "dCKFqY4Bn78", videoTitle: copy("銅玉子焼器の使い方", "How to use a copper tamagoyaki pan"), dark: true},
      {kicker: copy("MOVIE 02", "MOVIE 02"), title: copy("玉子焼器から、弁当三品へ。", "From one pan to a three-dish bento."), body: copy("玉子焼きだけに閉じない四角い鍋の使い方。日々の小さな料理へ展開するヒントを紹介します。", "The rectangular pan is not limited to omelette. See how its form extends into a small collection of everyday dishes."), videoId: "YUUpdsRS-04", videoTitle: copy("釜浅の良理道具こんなことにも お弁当三品料理編", "KAMA-ASA tools: three dishes for a bento"), dark: true},
      {kicker: copy("POINT 01", "POINT 01"), title: copy("均一に、すばやく。銅ならではの火入れ。", "Even and fast—the particular heat of copper."), body: copy("熱伝導のよい銅はムラを抑え、卵へすばやく火を入れます。短い時間で水分を残し、ふっくらとした層を重ねられます。", "Highly conductive copper reduces uneven heat and cooks egg quickly, preserving moisture as each soft layer is rolled."), image: "/images/kamaasa/featured/tamagoyaki-pan.jpeg", imageAlt: copy("銅の玉子焼器", "Copper egg roll pan"), imageClassName: "object-cover object-[62%_center] scale-[1.2]"},
      {kicker: copy("POINT 02 / CARE", "POINT 02 / CARE"), title: copy("1.5mm厚と、交換を気にしない真鍮取手。", "Professional 1.5 mm copper, held by durable brass."), body: copy("厚手の銅が熱をやわらかく蓄え、耐久性の高い真鍮取手が長い使用を支えます。空焼きとIHは避け、使用後は洗剤を使わず、水分をよく拭き取ってください。", "Thick copper softens and stores heat while the brass handle is made for longevity. Avoid dry heating and induction; clean without detergent and dry thoroughly."), specs: [{label: copy("サイズ", "Sizes"), value: copy("10.5 / 12 / 13cm", "10.5 / 12 / 13 cm")},{label: copy("厚さ", "Thickness"), value: copy("1.5mm", "1.5 mm")},{label: copy("素材", "Material"), value: copy("銅・錫引き・真鍮", "Copper, tin lining, brass")},{label: copy("熱源", "Heat source"), value: copy("ガス専用", "Gas only")},{label: copy("産地", "Origin"), value: copy("新潟県", "Niigata, Japan")}]},
      {kicker: copy("RELATED PRODUCTS", "RELATED PRODUCTS"), title: copy("焼き方と熱源から、玉子焼器を選ぶ。", "Choose an egg pan by style and heat source."), body: copy("だし巻きに向く関西型、厚焼きに向く関東型、形を整える専用蓋。玉子焼きの作り方から選べる道具です。", "Compare the Kansai form for rolled omelette, the Kanto form for thicker tamagoyaki and a fitted lid for shaping."), related: true}
    ]
  },
  {
    slug: "cast-iron-rice-cooking-pot",
    title: copy("釜浅のごはん釜", "KAMA-ASA’s Cast Iron Rice Cooking Pot"),
    description: copy("鋳鉄の蓄熱と椹の蓋で、かまどのように米を炊き上げる釜浅商店のごはん釜。", "A cast-iron rice pot with a Sawara cypress lid, engineered to cook with kamado-like efficiency."),
    image: "/images/kamaasa/featured/rice-pot.jpg",
    storeUrl: "https://kama-asa.co.jp/en-us/products/kama-asa-s-cast-iron-rice-cooking-pot",
    relatedProducts: [
      {name: copy("おひつ", "Ohitsu / Cooked-Rice Container"), image: "/images/kamaasa/related/rice-ohitsu.jpg", href: "https://kama-asa.co.jp/en/products/miyabi-urushi-ohitsu-cooked-rice-jar-size-18cm-24cm"},
      {name: copy("木曽椹 飯台", "Kiso Sawara Sushi Rice Mixing Tub"), image: "/images/kamaasa/related/rice-mixing-tub.jpg", href: "https://kama-asa.co.jp/en/products/miyabi-urushi-handai-sushi-rice-mixing-tub-size-30cm-36cm"},
      {name: copy("宮島工芸 桜のしゃもじ", "MIYAJIMA-KOUGEI Cherry Wood Rice Paddle"), image: "/images/kamaasa/related/rice-paddle.jpg", href: "https://kama-asa.co.jp/en/products/miyajima-kougei-cherry-wood-rice-paddle"}
    ],
    pages: [
      {kicker: copy("KAMA-ASA ORIGINAL", "KAMA-ASA ORIGINAL"), title: copy("釜浅のごはん釜", "Cast Iron Rice Cooking Pot"), body: copy("一粒ずつを立たせ、甘みを引き出す。かまどの熱効率を、現代の台所へ置ける平たい鋳鉄の形にしました。", "Lift every grain and draw out its sweetness. Kamado-like heat efficiency is recast in a low iron form for the modern kitchen."), image: "/images/kamaasa/featured/rice-pot.jpg", imageAlt: copy("釜浅のごはん釜", "KAMA-ASA cast iron rice cooking pot"), imageClassName: "object-cover object-center"},
      {kicker: copy("MOVIE 01", "MOVIE 01"), title: copy("鉄釜で炊いて、おいしく食べる。", "Cook in iron, then taste the difference."), body: copy("釜の熱が米へ回り、蒸らしまでつながる時間。炊き上がりの粒立ちと、食卓へ届くまでを映像で紹介します。", "Follow the heat through cooking and resting, then see the texture of the finished grains as the rice reaches the table."), videoId: "SG4eoPHCMHc", videoTitle: copy("鉄釜で炊いて、美味しく食べる", "Cooking and enjoying rice in an iron pot"), dark: true},
      {kicker: copy("MOVIE 02", "MOVIE 02"), title: copy("炊き方と、お手入れ。", "Cooking method and everyday care."), body: copy("火加減、蒸らし、洗浄、乾燥。鋳鉄と木曽さわらの蓋を長く使うための基本を、順番に確かめます。", "Review the sequence of heat control, resting, washing and drying for long use of both cast iron and Sawara cypress."), videoId: "qMm4pwwPy2Q", videoTitle: copy("釜浅のごはん釜 炊き方とお手入れ", "How to cook with and care for the KAMA-ASA rice pot"), dark: true},
      {kicker: copy("POINT 01", "POINT 01"), title: copy("平たい鋳鉄が、かまどに近い熱をつくる。", "A low cast-iron form recreates kamado-like heat."), body: copy("独自の浅く丸い形が底面から側面へ熱を均一に回し、鋳鉄の蓄熱性が温度を安定させます。火力を調節しやすく、火を止めたあとの蒸らしまで蓄えた熱が働き続けます。", "The low rounded form moves heat from base to sides, while cast iron stabilizes temperature. Heat is easier to manage, and stored warmth keeps working through the resting stage."), image: "/images/kamaasa/featured/rice-pot.jpg", imageAlt: copy("平たい形の鋳鉄ごはん釜", "Low-profile cast iron rice pot"), imageClassName: "object-cover object-[55%_center] scale-[1.18]"},
      {kicker: copy("POINT 02", "POINT 02"), title: copy("錆びに強く、吹きこぼれを受け止める。", "Rust resistance, with a rim that catches spills."), body: copy("窒化処理のあとに酸化処理を施し、鉄の質感を残したまま錆びに強い表面へ。塗装ではないため剥がれにくく、つばの返しが吹きこぼれを下へ落ちにくくして、コンロまわりの手入れも軽くします。", "Nitriding followed by oxidation creates rust resistance without a coating that can peel. A raised return on the rim catches boil-over before it runs down to the stove."), dark: true},
      {kicker: copy("POINT 03", "POINT 03"), title: copy("木曽さわらの蓋が、余分な水分を受け止める。", "Kiso Sawara cypress receives excess moisture."), body: copy("油分が多く湿気に強い木曽さわらが余分な水分を吸い、ごはんの水っぽさを防ぎます。裏側の溝で密閉性を高め、伝統的な「雇い核継ぎ」が接合部を補強。ひびが入っても蒸気を逃がしにくい構造です。", "Oil-rich Kiso Sawara cypress absorbs excess moisture. A groove improves the seal, while traditional Yatoizanetsugi joinery strengthens the lid and helps retain steam even if a fine crack appears."), dark: true},
      {kicker: copy("MADE ACROSS JAPAN", "MADE ACROSS JAPAN"), title: copy("四つの土地の技を、一つの釜へ。", "Four regions, assembled into one pot."), body: copy("山梨で鋳造し、神奈川で表面処理、岩手で仕上げ、長野で蓋をつくる。各地の技をつなぎ、錆びにくく、長く使える道具へ整えています。", "Cast in Yamanashi, surface-treated in Kanagawa, finished in Iwate and paired with a lid from Nagano—regional techniques brought together for longevity and rust resistance."), image: "/images/kamaasa/featured/rice-pot.jpg", imageAlt: copy("ごはん釜と木蓋", "Rice pot and wooden lid"), imageClassName: "object-cover object-center"},
      {kicker: copy("COOKING / CARE", "COOKING / CARE"), title: copy("洗米と浸水を除いて、約30分。", "About 30 minutes, after washing and soaking."), body: copy("300〜600gの生米に対応。炊飯後はごはんを取り出し、鍋を洗って火にかけ、水分を完全に飛ばします。空焚き、落下、急冷は割れや錆の原因になります。", "Designed for 300–600 g of raw rice. Remove rice after cooking, wash the pot and dry it completely over heat. Avoid dry heating, impact and sudden cooling."), specs: [{label: copy("直径", "Diameter"), value: copy("21cm（フランジ含む26cm）", "21 cm (26 cm incl. flange)")},{label: copy("高さ", "Height"), value: copy("9.5cm", "9.5 cm")},{label: copy("重さ", "Weight"), value: copy("約3.2kg（蓋含む）", "Approx. 3.2 kg incl. lid")},{label: copy("炊飯量", "Capacity"), value: copy("生米300〜600g", "300–600 g raw rice")},{label: copy("熱源", "Heat source"), value: copy("ガス・IH", "Gas / induction")},{label: copy("素材", "Materials"), value: copy("鋳鉄・椹", "Cast iron / Sawara cypress")}]},
      {kicker: copy("RELATED PRODUCTS", "RELATED PRODUCTS"), title: copy("炊き上がったあとまで、おいしく。", "Care for the rice after it leaves the pot."), body: copy("余分な水分を調えるおひつ、酢飯をつくる飯台、粒をつぶしにくい桜のしゃもじ。炊き上がりの先を支える道具です。", "An ohitsu for balancing moisture, a mixing tub for sushi rice and a cherry-wood paddle that treats each grain gently."), related: true}
    ]
  }
];

export const featuredProductStoryBySlug = Object.fromEntries(featuredProductStories.map((story) => [story.slug, story]));
