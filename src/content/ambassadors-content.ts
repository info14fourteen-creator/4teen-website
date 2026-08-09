import type { SupportedSiteLocale } from "@/lib/site-locale";
import { getGeneratedPageContent } from "../lib/generated-localization";

type HeroStatContent = {
  label: string;
  meta: string;
};

type SimpleCard = {
  eyebrow: string;
  title: string;
  text: string;
};

type BulletCard = SimpleCard & {
  bullets?: string[];
};

export type AmbassadorsPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    badge: string;
    title: string;
    subtitle: string;
    body: string[];
    rotatingLines: string[];
    primaryCta: string;
    secondaryCta: string;
    ctaNote: string;
    stats: {
      profilesOnChain: HeroStatContent;
      boundBuyers: HeroStatContent;
      rewardsClaimed: HeroStatContent;
      pendingReplay: HeroStatContent;
      readFailed: string;
      readRetry: string;
    };
  };
  sections: {
    cabinetRoute: {
      eyebrow: string;
      title: string;
      intro: string;
      mainCard: BulletCard;
      cards: SimpleCard[];
      note: string;
    };
    registration: {
      eyebrow: string;
      title: string;
      intro: string;
      mainCard: BulletCard;
      cards: SimpleCard[];
      note: string;
    };
    ledger: {
      eyebrow: string;
      title: string;
      note: string;
      rows: {
        totalAmbassadors: string;
        activeAmbassadors: string;
        boundBuyers: string;
        trackedVolume: string;
        rewardsAccrued: string;
        rewardsClaimed: string;
        reservedRewards: string;
        ownerAvailable: string;
        unallocatedFunds: string;
      };
    };
    runtime: {
      eyebrow: string;
      title: string;
      note: string;
      readyYes: string;
      readyNo: string;
      rows: {
        operatorWallet: string;
        readyNow: string;
        profilesOnChain: string;
        profilesActive: string;
        pendingReplay: string;
        lastPurchaseSeen: string;
        lastWithdrawalSeen: string;
        energyAvailable: string;
        bandwidthAvailable: string;
        needPerAllocation: string;
        safeFloorAfterRun: string;
      };
    };
    levels: {
      eyebrow: string;
      title: string;
      suffix: string;
    };
    proof: {
      eyebrow: string;
      title: string;
      cards: {
        recordedPurchases: {
          title: string;
          text: string;
        };
        ambassadorsWithPurchases: {
          title: string;
          text: string;
        };
        withdrawals: {
          title: string;
          text: string;
        };
        latestWithdrawal: {
          title: string;
          text: string;
        };
      };
      note: string;
    };
    route: {
      eyebrow: string;
      title: string;
      cards: {
        contract: {
          eyebrow: string;
          title: string;
          text: string;
        };
        walletRepo: {
          eyebrow: string;
          title: string;
          text: string;
        };
        app: {
          eyebrow: string;
          title: string;
          text: string;
        };
      };
      updatedPrefix: string;
    };
  };
};

const ambassadorsContentEn: AmbassadorsPageContent = {
  metadata: {
    title: "Public Ambassador Controller",
    description:
      "4TEEN public ambassador controller with live FourteenController totals, cabinet-backed registration flow, buyer binding proof, reward tracking, and runtime readiness.",
  },
  hero: {
    eyebrow: "FourteenController",
    badge: "Public ambassador controller",
    title: "A Public 4TEEN Ambassador Controller With a Real Cabinet Behind It",
    subtitle:
      "The website is the proof layer. Registration, slug ownership, buyer binding, reward accrual, and withdrawals still live in the wallet cabinet and settle against FourteenController.",
    body: [
      "This route should not pretend the public page is the working cabinet. The real flow starts in the wallet: a user registers an ambassador identity, claims a slug, syncs the on-chain profile, and then accumulates buyer-attributed volume and rewards.",
      "The public site has a different job. It should prove that the controller is live, cabinet profiles exist, buyer bindings are being tracked, purchases are being processed, and reward state stays visible instead of disappearing into a back office.",
    ],
    rotatingLines: [
      "REGISTER. BIND. VERIFY. WITHDRAW.",
      "PUBLIC PROOF. REAL CABINET.",
      "SLUG FIRST. REWARD FLOW LATER.",
    ],
    primaryCta: "Open Wallet Route",
    secondaryCta: "See Registration Flow",
    ctaNote:
      "Cabinet identity, referral link, buyer rows, pending replay, and withdrawals remain wallet-native. The website stays public, readable, and honest.",
    stats: {
      profilesOnChain: {
        label: "Profiles On Chain",
        meta: "Ambassador profiles already visible through the controller-backed cabinet layer.",
      },
      boundBuyers: {
        label: "Bound Buyers",
        meta: "Buyer identities already attached to ambassador profiles.",
      },
      rewardsClaimed: {
        label: "Rewards Claimed",
        meta: "TRX already withdrawn by ambassadors through the cabinet flow.",
      },
      pendingReplay: {
        label: "Pending Replay",
        meta: "Rows still waiting for resource-safe processing instead of being faked as complete.",
      },
      readFailed: "Live ambassador read failed.",
      readRetry: "Try refreshing in a moment.",
    },
  },
  sections: {
    cabinetRoute: {
      eyebrow: "Cabinet Route",
      title: "The public page is not the cabinet. It proves the cabinet exists.",
      intro:
        "That is the clean product split. The wallet owns identity, binding, replay, and withdrawal actions. The site explains the mechanics and shows whether the system is actually moving.",
      mainCard: {
        eyebrow: "Controller + Cabinet",
        title: "Registration and rewards stay wallet-native. Public proof stays open.",
        text:
          "The cabinet endpoint already merges on-chain dashboard state with database rows for buyers, purchases, and pending replay. That means the public site can speak truthfully about the flow without pretending it can replace the cabinet itself.",
        bullets: [
          "The cabinet resolves a referral link from the ambassador slug.",
          "Buyer-attributed purchases are persisted and replayed against the controller when resources allow it.",
          "Claimable reward state and withdrawal history are tracked alongside the on-chain profile.",
        ],
      },
      cards: [
        {
          eyebrow: "Slug ownership",
          title: "A wallet does not become an ambassador by marketing text alone",
          text:
            "The registration flow checks slug availability, prevents duplicate wallet registration, and expects a real on-chain ambassador profile before the route is considered complete.",
        },
        {
          eyebrow: "Buyer binding",
          title: "The earn route starts when purchases are actually attributed",
          text:
            "Bound buyers, attributed purchases, processed controller rows, and pending replay are all separate states. The cabinet does not flatten them into one decorative number.",
        },
      ],
      note:
        "That is why the page should describe a public ambassador controller with a real cabinet behind it, not a fake referral landing page with no operating state.",
    },
    registration: {
      eyebrow: "Registration Flow",
      title: "Registration starts in the wallet, then becomes an on-chain profile.",
      intro:
        "The registration screen is not a loose signup form. It is the point where slug selection, wallet identity, energy routing, and controller sync begin to matter.",
      mainCard: {
        eyebrow: "ambassador_registration",
        title: "The wallet can quote resources, validate the slug, and only then finalize registration.",
        text:
          "The API checks whether the slug is taken, whether the wallet is already registered, and whether the energy route is ready for the ambassador_registration purpose. After the transaction, the cabinet sync verifies that the on-chain profile really exists.",
        bullets: [
          "Slug availability is checked before the route confirms.",
          "Energy rental can be requested specifically for ambassador registration when needed.",
          "The cabinet sync verifies the stored slug hash and exposes the final referral link.",
        ],
      },
      cards: [
        {
          eyebrow: "Wallet identity",
          title: "Registration becomes a profile, not a one-time form fill",
          text:
            "Once synced, the ambassador has a wallet-bound profile with current level, reward percent, buyer count, volume, accrued rewards, claimed rewards, and claimable balance.",
        },
        {
          eyebrow: "Replay safety",
          title: "If the operator side is resource-starved, rows wait instead of lying",
          text:
            "Pending replay is part of the truth layer. The cabinet keeps it visible until operator resources are safe enough to process verified purchases cleanly.",
        },
      ],
      note:
        "So the registration sequence is not cosmetic. It is the doorway into the same cabinet that later holds referral state, purchase rows, and withdrawals.",
    },
    ledger: {
      eyebrow: "Public Ledger",
      title: "Controller totals stay public even when cabinet actions stay private.",
      note:
        "FourteenController exposes system-level counts and balances. The site should make that visible without pretending the public layer can sign cabinet transactions.",
      rows: {
        totalAmbassadors: "Total Ambassadors",
        activeAmbassadors: "Active Ambassadors",
        boundBuyers: "Bound Buyers",
        trackedVolume: "Tracked Volume",
        rewardsAccrued: "Rewards Accrued",
        rewardsClaimed: "Rewards Claimed",
        reservedRewards: "Reserved Rewards",
        ownerAvailable: "Owner Available",
        unallocatedFunds: "Unallocated Purchase Funds",
      },
    },
    runtime: {
      eyebrow: "Cabinet Runtime",
      title: "If resources are low, rows wait instead of pretending they cleared.",
      note:
        "The public runtime view matters because it explains why replay can legitimately queue. Low energy or bandwidth is not a silent failure anymore; it is visible system state.",
      readyYes: "Ready now",
      readyNo: "Needs top-up",
      rows: {
        operatorWallet: "Operator Wallet",
        readyNow: "Ready Now",
        profilesOnChain: "Profiles On Chain",
        profilesActive: "Profiles Active",
        pendingReplay: "Pending Replay",
        lastPurchaseSeen: "Last Purchase Seen",
        lastWithdrawalSeen: "Last Withdrawal Seen",
        energyAvailable: "Energy Available",
        bandwidthAvailable: "Bandwidth Available",
        needPerAllocation: "Need per Allocation",
        safeFloorAfterRun: "Safe Floor After Run",
      },
    },
    levels: {
      eyebrow: "Level Ladder",
      title: "Buyer growth changes the reward share.",
      suffix: "% reward share on qualified flow.",
    },
    proof: {
      eyebrow: "Proof Layer",
      title: "The public side should still show what the cabinet has already processed.",
      cards: {
        recordedPurchases: {
          title: "Recorded Purchases",
          text: "Purchases already written into the cabinet footprint, across processed and pending rows.",
        },
        ambassadorsWithPurchases: {
          title: "Ambassadors With Purchases",
          text: "Profiles that already have purchase attribution moving through the earn route.",
        },
        withdrawals: {
          title: "Withdrawal Events",
          text: "Reward withdrawal rows already captured by the backend and cabinet sync.",
        },
        latestWithdrawal: {
          title: "Latest Withdrawal Seen",
          text: "Most recent recorded ambassador reward withdrawal timestamp.",
        },
      },
      note:
        "This keeps the website grounded in actual cabinet evidence: purchases, replay queue, and withdrawals all leave a visible public footprint.",
    },
    route: {
      eyebrow: "Proof Routes",
      title: "Use the public layer to inspect the controller, the wallet implementation, and the live app.",
      cards: {
        contract: {
          eyebrow: "Contract",
          title: "Open FourteenController",
          text: "Inspect the live controller that holds ambassador system stats and balances.",
        },
        walletRepo: {
          eyebrow: "Wallet Files",
          title: "Open the wallet repo",
          text: "See the cabinet, resource routing, registration logic, and replay flow that power the real product.",
        },
        app: {
          eyebrow: "Wallet Route",
          title: "Open the app route",
          text: "Registration, cabinet state, referral link, and withdrawals belong to the wallet experience.",
        },
      },
      updatedPrefix: "Snapshot updated",
    },
  },
};

const ambassadorsContentByLocale: Partial<Record<
  SupportedSiteLocale,
  AmbassadorsPageContent
>> = {
  en: ambassadorsContentEn,
  ru: {
    ...ambassadorsContentEn,
    metadata: { title: "Публичный ambassador-контроллер", description: "Публичный контроллер амбассадоров 4TEEN: регистрация через cabinet, привязка покупателей, учет наград и готовность runtime." },
    hero: { ...ambassadorsContentEn.hero, eyebrow: "FourteenController", badge: "Публичный ambassador-контроллер", title: "Публичный контроллер амбассадоров 4TEEN с настоящим кабинетом за ним", subtitle: "Сайт - слой доказательства. Регистрация, владение slug, привязка покупателей, начисление и вывод наград остаются в кабинете кошелька и сверяются с FourteenController.", body: ["Публичная страница не притворяется рабочим кабинетом. Настоящий поток начинается в кошельке: пользователь регистрирует ambassador identity, занимает slug, синхронизирует on-chain профиль и накапливает объем покупателей и награды.", "У сайта другая задача: доказать, что контроллер жив, профили существуют, привязки покупателей учитываются, покупки обрабатываются, а состояние наград не исчезает в бэкофисе."], rotatingLines: ["РЕГИСТРАЦИЯ. ПРИВЯЗКА. ПРОВЕРКА. ВЫВОД.", "ПУБЛИЧНОЕ ДОКАЗАТЕЛЬСТВО. НАСТОЯЩИЙ КАБИНЕТ."], primaryCta: "Открыть маршрут в кошельке", secondaryCta: "Посмотреть регистрацию", ctaNote: "Идентичность кабинета, реферальная ссылка, строки покупателей, pending replay и выводы остаются внутри кошелька. Сайт остается публичным и честным.", stats: { profilesOnChain: { label: "Профили on-chain", meta: "Профили амбассадоров, уже видимые через cabinet и контроллер." }, boundBuyers: { label: "Привязанные покупатели", meta: "Покупатели, уже прикрепленные к профилям амбассадоров." }, rewardsClaimed: { label: "Награды выведены", meta: "TRX, уже выведенный амбассадорами через cabinet." }, pendingReplay: { label: "Ожидают повтора", meta: "Строки, которые ждут безопасной обработки ресурсов, а не отмечены фальшиво как завершенные." }, readFailed: "Не удалось получить живое состояние амбассадоров.", readRetry: "Попробуйте обновить чуть позже." } },
    sections: { ...ambassadorsContentEn.sections, cabinetRoute: { eyebrow: "Маршрут кабинета", title: "Публичная страница - не кабинет. Она доказывает, что кабинет существует.", intro: "Это чистое разделение продукта: кошелек владеет identity, binding, replay и withdrawal, а сайт объясняет механику и показывает, движется ли система на самом деле.", mainCard: { eyebrow: "Контроллер + кабинет", title: "Регистрация и награды остаются в кошельке. Публичное доказательство остается открытым.", text: "Cabinet endpoint уже объединяет on-chain dashboard с базой покупателей, покупок и pending replay. Поэтому сайт говорит о потоке правдиво, не притворяясь заменой кабинета.", bullets: ["Кабинет строит реферальную ссылку из ambassador slug.", "Покупки с атрибуцией сохраняются и повторно проводятся через контроллер, когда есть ресурсы.", "Состояние награды и история вывода ведутся рядом с on-chain профилем."] }, cards: [{ eyebrow: "Владение slug", title: "Кошелек не становится ambassador из одного маркетингового текста", text: "Регистрация проверяет доступность slug, не допускает дубликат кошелька и ожидает реальный on-chain профиль." }, { eyebrow: "Привязка покупателей", title: "Earn-маршрут начинается, когда покупка действительно атрибутирована", text: "Привязанные покупатели, покупки, обработанные строки и pending replay - разные состояния, а не одна декоративная цифра." }], note: "Поэтому страница описывает публичный ambassador-контроллер с настоящим кабинетом, а не фальшивый referral landing без рабочего состояния." }, registration: { eyebrow: "Поток регистрации", title: "Регистрация начинается в кошельке и становится on-chain профилем.", intro: "Экран регистрации - не свободная форма. Здесь slug, identity кошелька, маршрутизация Energy и синхронизация контроллера становятся важными.", mainCard: { eyebrow: "ambassador_registration", title: "Кошелек считает ресурсы, проверяет slug и только затем завершает регистрацию.", text: "API проверяет, занят ли slug, зарегистрирован ли уже кошелек и готов ли energy route для ambassador_registration. После транзакции cabinet sync сверяет существование on-chain профиля.", bullets: ["Slug проверяется до подтверждения.", "При необходимости можно запросить аренду Energy именно для регистрации.", "Cabinet sync сверяет hash slug и публикует итоговую referral-ссылку."] }, cards: ambassadorsContentEn.sections.registration.cards, note: "Это не косметика: последовательность открывает тот же кабинет, который позже ведет referral state, покупки и выводы." }, ledger: { ...ambassadorsContentEn.sections.ledger, eyebrow: "Публичный реестр", title: "Итоги контроллера остаются публичными, даже когда действия кабинета приватны.", note: "FourteenController дает системные счетчики и балансы. Сайт показывает их, не притворяясь, что умеет подписывать cabinet-транзакции.", rows: { totalAmbassadors: "Всего амбассадоров", activeAmbassadors: "Активные амбассадоры", boundBuyers: "Привязанные покупатели", trackedVolume: "Учитываемый объем", rewardsAccrued: "Награды начислены", rewardsClaimed: "Награды выведены", reservedRewards: "Зарезервированные награды", ownerAvailable: "Доступно owner", unallocatedFunds: "Нераспределенные средства покупок" } }, runtime: { ...ambassadorsContentEn.sections.runtime, eyebrow: "Runtime кабинета", title: "Если ресурсов мало, строки ждут, а не притворяются проведенными.", note: "Публичный runtime объясняет, почему replay может легитимно попасть в очередь. Низкие Energy или Bandwidth - видимое состояние системы, а не тихая ошибка.", readyYes: "Готово сейчас", readyNo: "Нужно пополнение", rows: { operatorWallet: "Кошелек оператора", readyNow: "Готово сейчас", profilesOnChain: "Профили on-chain", profilesActive: "Активные профили", pendingReplay: "Ожидают повтора", lastPurchaseSeen: "Последняя покупка", lastWithdrawalSeen: "Последний вывод", energyAvailable: "Energy доступно", bandwidthAvailable: "Bandwidth доступно", needPerAllocation: "Нужно на распределение", safeFloorAfterRun: "Безопасный остаток после запуска" } }, levels: { eyebrow: "Лестница уровней", title: "Рост покупателей меняет долю награды.", suffix: "% доля награды на квалифицированном потоке." }, proof: { ...ambassadorsContentEn.sections.proof, eyebrow: "Слой доказательства", title: "Публичная сторона показывает то, что кабинет уже обработал.", cards: { recordedPurchases: { title: "Записанные покупки", text: "Покупки в footprint кабинета: обработанные и ожидающие строки." }, ambassadorsWithPurchases: { title: "Амбассадоры с покупками", text: "Профили, у которых уже есть атрибутированные покупки в earn-маршруте." }, withdrawals: { title: "События вывода", text: "Строки вывода наград, записанные backend и cabinet sync." }, latestWithdrawal: { title: "Последний замеченный вывод", text: "Последний timestamp вывода награды ambassador." } }, note: "Покупки, очередь replay и выводы оставляют видимый публичный след." }, route: { ...ambassadorsContentEn.sections.route, eyebrow: "Маршруты проверки", title: "Используйте публичный слой для проверки контроллера, кода кошелька и живого приложения.", cards: { contract: { eyebrow: "Контракт", title: "Открыть FourteenController", text: "Проверьте живой контроллер с системной статистикой и балансами амбассадоров." }, walletRepo: { eyebrow: "Файлы кошелька", title: "Открыть репозиторий кошелька", text: "Посмотрите cabinet, ресурсы, регистрацию и replay-поток настоящего продукта." }, app: { eyebrow: "Маршрут кошелька", title: "Открыть приложение", text: "Регистрация, cabinet state, referral link и выводы принадлежат опыту кошелька." } }, updatedPrefix: "Snapshot обновлен" } },
  },
  uz: {
    ...ambassadorsContentEn,
    metadata: { title: "Ommaviy ambassador kontrolleri", description: "4TEEN ambassadorlarining ommaviy kontrolleri: cabinet orqali ro'yxatdan o'tish, xaridorlarni bog'lash, mukofotlarni hisoblash va runtime tayyorligi." },
    hero: { ...ambassadorsContentEn.hero, eyebrow: "FourteenController", badge: "Ommaviy ambassador kontrolleri", title: "Haqiqiy kabinetga ega 4TEEN ommaviy ambassador kontrolleri", subtitle: "Sayt - isbot qatlami. Ro'yxatdan o'tish, slug egaligi, xaridorlarni bog'lash, mukofotlar va yechib olish hamyon kabinetida qoladi hamda FourteenController bilan hisoblashadi.", body: ["Ommaviy sahifa ishlaydigan kabinet bo'lib ko'rinmaydi. Haqiqiy oqim hamyonda boshlanadi: foydalanuvchi ambassador identity yaratadi, slug tanlaydi va on-chain profilini sinxronlaydi.", "Saytning vazifasi boshqacha: kontroller tirikligini, profillar va xaridorlar bog'lanishini, xaridlar hamda mukofotlar holati ko'rinishini isbotlash."], rotatingLines: ["RO'YXATDAN O'TISH. BOG'LASH. TEKSHIRISH. YECHIB OLISH.", "OMMAVIY ISBOT. HAQIQIY KABINET."], primaryCta: "Hamyon yo'nalishini ochish", secondaryCta: "Ro'yxatdan o'tishni ko'rish", ctaNote: "Cabinet identity, referral havola, xaridor qatorlari, pending replay va yechib olish hamyonga tegishli. Sayt ommaviy va halol qoladi.", stats: { profilesOnChain: { label: "On-chain profillar", meta: "Kontroller va cabinet orqali ko'rinadigan ambassador profillari." }, boundBuyers: { label: "Bog'langan xaridorlar", meta: "Ambassador profiliga biriktirilgan xaridorlar." }, rewardsClaimed: { label: "Yechilgan mukofotlar", meta: "Cabinet orqali ambassadorlar yechib olgan TRX." }, pendingReplay: { label: "Kutilayotgan replay", meta: "Resurs xavfsiz ishlovini kutayotgan qatorlar." }, readFailed: "Jonli ambassador holatini o'qib bo'lmadi.", readRetry: "Birozdan keyin yangilang." } },
    sections: { ...ambassadorsContentEn.sections, cabinetRoute: { ...ambassadorsContentEn.sections.cabinetRoute, eyebrow: "Cabinet yo'nalishi", title: "Ommaviy sahifa kabinet emas. U kabinet borligini isbotlaydi.", intro: "Hamyon identity, binding, replay va withdrawal harakatlariga egalik qiladi. Sayt esa mexanikani tushuntiradi va tizim ishlayotganini ko'rsatadi.", mainCard: { eyebrow: "Kontroller + cabinet", title: "Ro'yxatdan o'tish va mukofotlar hamyonda. Ommaviy isbot ochiq.", text: "Cabinet endpoint on-chain dashboard holatini xaridorlar, xaridlar va pending replay bazasi bilan birlashtiradi.", bullets: ["Cabinet ambassador slugidan referral havola yaratadi.", "Bog'langan xaridlar resurslar mavjud bo'lganda kontroller orqali qayta ishlanadi.", "Mukofot holati va yechib olish tarixi on-chain profil yonida yuritiladi."] }, cards: [{ eyebrow: "Slug egaligi", title: "Hamyon faqat marketing matni bilan ambassador bo'lmaydi", text: "Ro'yxatdan o'tish slug mavjudligini, dublikat hamyonni va haqiqiy on-chain profilni tekshiradi." }, { eyebrow: "Xaridor bog'lanishi", title: "Earn yo'nalishi xaridlar haqiqatan biriktirilganda boshlanadi", text: "Bog'langan xaridorlar, xaridlar va pending replay alohida holatlardir." }], note: "Bu soxta referral landing emas, haqiqiy kabinetga ega ommaviy ambassador kontrolleridir." }, registration: { ...ambassadorsContentEn.sections.registration, eyebrow: "Ro'yxatdan o'tish oqimi", title: "Ro'yxatdan o'tish hamyonda boshlanib, on-chain profilga aylanadi.", intro: "Slug, hamyon identity, Energy yo'nalishi va kontroller sinxronizatsiyasi bu yerda muhim bo'ladi.", mainCard: { eyebrow: "ambassador_registration", title: "Hamyon resurslarni hisoblaydi, slugni tekshiradi va keyin ro'yxatdan o'tishni yakunlaydi.", text: "API slug bandligini, hamyon avval ro'yxatdan o'tganini va energy route tayyorligini tekshiradi.", bullets: ["Slug tasdiqlashdan oldin tekshiriladi.", "Kerak bo'lsa ro'yxatdan o'tish uchun Energy ijarasi so'raladi.", "Cabinet sync slug hash va referral havolani tekshiradi."] }, note: "Bu kabinetga kirish eshigi bo'lib, keyin referral state, xaridlar va yechib olishni yuritadi." }, ledger: { ...ambassadorsContentEn.sections.ledger, eyebrow: "Ommaviy reestr", title: "Cabinet harakatlari shaxsiy qolsa ham kontroller jamlanmalari ommaviy.", note: "FourteenController tizim hisoblagichlari va balanslarini beradi.", rows: { totalAmbassadors: "Jami ambassadorlar", activeAmbassadors: "Faol ambassadorlar", boundBuyers: "Bog'langan xaridorlar", trackedVolume: "Kuzatilgan hajm", rewardsAccrued: "Hisoblangan mukofotlar", rewardsClaimed: "Yechilgan mukofotlar", reservedRewards: "Rezervdagi mukofotlar", ownerAvailable: "Owner uchun mavjud", unallocatedFunds: "Taqsimlanmagan xarid mablag'lari" } }, runtime: { ...ambassadorsContentEn.sections.runtime, eyebrow: "Cabinet runtime", title: "Resurslar kam bo'lsa qatorlar kutadi, bajarilgandek ko'rinmaydi.", note: "Past Energy yoki Bandwidth xira xatolik emas, ko'rinadigan tizim holati.", readyYes: "Hozir tayyor", readyNo: "To'ldirish kerak", rows: { operatorWallet: "Operator hamyoni", readyNow: "Hozir tayyor", profilesOnChain: "On-chain profillar", profilesActive: "Faol profillar", pendingReplay: "Kutilayotgan replay", lastPurchaseSeen: "Oxirgi xarid", lastWithdrawalSeen: "Oxirgi yechib olish", energyAvailable: "Energy mavjud", bandwidthAvailable: "Bandwidth mavjud", needPerAllocation: "Taqsimot uchun kerak", safeFloorAfterRun: "Ishdan keyingi xavfsiz qoldiq" } }, levels: { eyebrow: "Darajalar zinasi", title: "Xaridorlar o'sishi mukofot ulushini o'zgartiradi.", suffix: "% malakali oqimdagi mukofot ulushi." }, proof: { ...ambassadorsContentEn.sections.proof, eyebrow: "Isbot qatlami", title: "Ommaviy tomon cabinet allaqachon qayta ishlagan narsani ko'rsatadi.", cards: { recordedPurchases: { title: "Qayd etilgan xaridlar", text: "Cabinet footprintidagi qayta ishlangan va kutilayotgan xaridlar." }, ambassadorsWithPurchases: { title: "Xaridli ambassadorlar", text: "Earn yo'nalishida biriktirilgan xaridlari bor profillar." }, withdrawals: { title: "Yechib olish voqealari", text: "Backend va cabinet sync qayd etgan mukofot yechib olish qatorlari." }, latestWithdrawal: { title: "Oxirgi yechib olish", text: "Eng so'nggi ambassador mukofotini yechib olish vaqti." } }, note: "Xaridlar, replay navbati va yechib olishlar ommaviy iz qoldiradi." }, route: { ...ambassadorsContentEn.sections.route, eyebrow: "Tekshiruv yo'nalishlari", title: "Kontroller, hamyon kodi va jonli ilovani ommaviy qatlamdan tekshiring.", cards: { contract: { eyebrow: "Kontrakt", title: "FourteenController-ni ochish", text: "Tizim statistikasi va balanslari bo'lgan jonli kontroller." }, walletRepo: { eyebrow: "Hamyon fayllari", title: "Hamyon repozitoriyasini ochish", text: "Cabinet, resurs yo'nalishi, ro'yxatdan o'tish va replay oqimini ko'ring." }, app: { eyebrow: "Hamyon yo'nalishi", title: "Ilova yo'nalishini ochish", text: "Ro'yxatdan o'tish, cabinet holati, referral va yechib olish hamyon tajribasiga tegishli." } }, updatedPrefix: "Snapshot yangilandi" } },
  },
};

export function getAmbassadorsPageContent(
  locale: SupportedSiteLocale,
): AmbassadorsPageContent {
  return getGeneratedPageContent(
    locale,
    "ambassadors",
    ambassadorsContentByLocale[locale] ?? ambassadorsContentEn,
  );
}
