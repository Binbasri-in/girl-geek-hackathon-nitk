const walkthrough_01_01_images = [
    require("../assets/images/walkthrough/walkthrough_01_01.png"),
    require("../assets/images/walkthrough/walkthrough_01_02.png"),
    require("../assets/images/walkthrough/walkthrough_01_03.png"),
    require("../assets/images/walkthrough/walkthrough_01_04.png"),
]

const walkthrough_01_02_images = [
    require("../assets/images/walkthrough/walkthrough_01_05.png"),
    require("../assets/images/walkthrough/walkthrough_01_06.png"),
    require("../assets/images/walkthrough/walkthrough_01_07.png"),
    require("../assets/images/walkthrough/walkthrough_01_01.png"),
]

const walkthrough = [
    {
        id: 0,
        title: "Simplify Sync",
        sub_title: "Your AI-Powered Productivity Companion",
    },
    {
        id: 1,
        title: "Mindsweep",
        sub_title: "Effortless Productivity at Your Fingertips",
    },
    {
        id: 2,
        title: "MetaTasker",
        sub_title: "Master Your Day with AI Precision",
    },
    {
        id: 3,
        title: "MindFlow",
        sub_title: "Efficiency Redefined, Tasks Simplified",
    },
]

const home_tabs = [
    {
        id: 0,
        label: "Product"
    },
    {
        id: 1,
        label: "My Chart"
    },
    {
        id: 2,
        label: "Service"
    }
]

const dashboard_screens = {
    home: "Home",
    category: "Category",
    promo: "Promo",
    profile: "Profile",
    message: "Message",
}

const bottom_tabs = [
    {
        id: 0,
        label: dashboard_screens.home,
    },
    {
        id: 1,
        label: dashboard_screens.category,
    },
    {
        id: 2,
        label: dashboard_screens.promo,
    },
    {
        id: 3,
        label: dashboard_screens.profile,
    }
]

const category_tabs = [
    {
        id: 0,
        label: "General"
    },
    {
        id: 1,
        label: "Collection"
    }
]

const product_detail_tabs = [
    {
        id: 0,
        label: "Overview"
    },
    {
        id: 1,
        label: "Details Description"
    }
]

const promo_tabs = [
    {
        id: 0,
        label: "Effective Coupon"
    },
    {
        id: 1,
        label: "Latest Coupon"
    },
    {
        id: 2,
        label: "Expiring Coupon"
    },
    {
        id: 3,
        label: "Brand Coupon"
    }
]

const cart_tabs = [
    {
        id: 0,
        label: "Your cart"
    },
    {
        id: 1,
        label: "Process"
    },
    {
        id: 2,
        label: "History"
    }
]

const action_type = {
    cart: "Add to Cart",
    pay: "Pay Now"
}

const scan_product_option = {
    qr: "QR",
    camera: "CAMERA"
}

const reels = {
    column: 3,
    row: 5,
    image_seq: [
        "GHAIJKALMFLNLFNCOAFBCACDEF",
        "ABDBHCDEBFFGCHIIHJKFLMHNFO",
        "EGFFGHDIJDOKAGDOABCDODLMNO"
    ],
    image_repeat: 30
}

const store_info_tabs = [
    {
        id: 0,
        label: "Store"
    },
    {
        id: 1,
        label: "Product"
    },
    {
        id: 2,
        label: "Store Records"
    }
]

export default {
    walkthrough_01_01_images,
    walkthrough_01_02_images,
    walkthrough,
    home_tabs,
    dashboard_screens,
    bottom_tabs,
    category_tabs,
    product_detail_tabs,
    promo_tabs,
    cart_tabs,
    action_type,
    scan_product_option,
    reels,
    store_info_tabs
}