import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import { getLiveAmbassadorSnapshot } from "@/lib/ambassador-live";

export const metadata: Metadata = {
  title: "Ambassadors",
  description:
    "Live FourteenController ambassador snapshot with totals for ambassadors, bound buyers, verified purchases, claimed rewards, reserved rewards, and public cabinet readiness.",
};

export const revalidate = 120;

const FOURTEEN_CONTROLLER_SCAN_URL =
  "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ";

const earnFlow = [
  {
    eyebrow: "Register",
    title: "Identity first",
    text: "The wallet route begins with ambassador registration, slug ownership, and cabinet identity. The public website does not fake this step as a generic referral form.",
  },
  {
    eyebrow: "Bind",
    title: "Buyer attribution",
    text: "Purchases are not counted from loose traffic guesses. A buyer is bound, the purchase is verified, and only then the controller tracks reward state.",
  },
  {
    eyebrow: "Accrue",
    title: "Reward reservation",
    text: "The controller separates accrued rewards, claimed rewards, owner balance, and reserved rewards, so the cabinet can explain what belongs to ambassadors and what is still waiting.",
  },
  {
    eyebrow: "Withdraw",
    title: "Claimable cabinet",
    text: "The same route later becomes the cabinet: purchases, level progress, pending replay, and withdrawable reward balance live in one place.",
  },
] as const;

function shortenAddress(address: string | null | undefined) {
  const safe = String(address || "").trim();
  if (!safe) return "Not configured";
  if (safe.length <= 14) return safe;
  return `${safe.slice(0, 6)}...${safe.slice(-6)}`;
}

export default async function AmbassadorsPage() {
  let snapshot:
    | Awaited<ReturnType<typeof getLiveAmbassadorSnapshot>>
    | null = null;
  let errorText = "";

  try {
    snapshot = await getLiveAmbassadorSnapshot();
  } catch (error) {
    errorText =
      error instanceof Error ? error.message : "Failed to load live ambassador state.";
  }

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-ambassador-page">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <article className="ft-card ft-card--strong ft-placeholder-hero">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">FourteenController</span>
                <span className="ft-status-pill live">Public earn cabinet snapshot</span>
              </div>

              <div className="ft-stack ft-stack--md">
                <h1 className="ft-title-lg">
                  The ambassador route is a real earn system with tracked buyers, verified
                  purchases, reserved rewards, and controlled withdrawals.
                </h1>
                <p className="ft-lead">
                  In the wallet, this surface starts with registration and turns into the cabinet
                  for the same wallet. On the website, we keep it informational: public controller
                  totals, purchase footprint, withdrawal history, reward balances, level ladder,
                  and operator readiness are shown without pretending to connect a wallet here.
                </p>
              </div>

              {snapshot ? (
                <div className="ft-grid ft-grid--4 ft-ambassador-page__hero-stats">
                  <article className="ft-price-card">
                    <p className="ft-price-label">Total Ambassadors</p>
                    <p className="ft-price-main">{snapshot.system.ambassadorsCount}</p>
                    <p className="ft-price-sub">
                      {snapshot.system.activeAmbassadorsCount} active on-chain right now.
                    </p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">Rewards Claimed</p>
                    <p className="ft-price-main">{snapshot.system.rewardsClaimedDisplay}</p>
                    <p className="ft-price-sub">TRX already withdrawn by ambassadors.</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">Verified Purchases</p>
                    <p className="ft-price-main">{snapshot.db.purchasesProcessed}</p>
                    <p className="ft-price-sub">Purchases already processed into the earn flow.</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">Bound Buyers</p>
                    <p className="ft-price-main">{snapshot.system.boundBuyersCount}</p>
                    <p className="ft-price-sub">Buyer identities currently tied to ambassadors.</p>
                  </article>
                </div>
              ) : (
                <div className="ft-note">
                  <strong>Live earn snapshot failed.</strong> {errorText || "Try refreshing in a moment."}
                </div>
              )}
            </div>
          </article>

          {snapshot ? (
            <>
              <div className="ft-grid ft-grid--2-even ft-ambassador-page__section-grid">
                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">System Counts</p>
                      <h2 className="ft-subtitle">Who is inside the controller footprint</h2>
                    </div>

                    <table className="ft-mini-table ft-ambassador-page__mini-table">
                      <tbody>
                        <tr>
                          <th>Total Ambassadors</th>
                          <td className="ft-right">{snapshot.system.ambassadorsCount}</td>
                        </tr>
                        <tr>
                          <th>Active Ambassadors</th>
                          <td className="ft-right">{snapshot.system.activeAmbassadorsCount}</td>
                        </tr>
                        <tr>
                          <th>Bound Buyers</th>
                          <td className="ft-right">{snapshot.system.boundBuyersCount}</td>
                        </tr>
                        <tr>
                          <th>Profiles On Chain</th>
                          <td className="ft-right">{snapshot.db.profilesOnChain}</td>
                        </tr>
                        <tr>
                          <th>Profiles Marked Active</th>
                          <td className="ft-right">{snapshot.db.profilesActive}</td>
                        </tr>
                        <tr>
                          <th>Ambassadors With Purchases</th>
                          <td className="ft-right">{snapshot.db.ambassadorsWithPurchases}</td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">
                      This combines public controller totals with cabinet-side profile and purchase
                      footprint from the wallet backend. That keeps the website informative without
                      pretending to be the cabinet itself.
                    </p>
                  </div>
                </article>

                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">Reward Ledger</p>
                      <h2 className="ft-subtitle">What the controller says about money flow</h2>
                    </div>

                    <table className="ft-mini-table ft-ambassador-page__mini-table">
                      <tbody>
                        <tr>
                          <th>Tracked Volume</th>
                          <td className="ft-right">{snapshot.system.trackedVolumeDisplay} TRX</td>
                        </tr>
                        <tr>
                          <th>Rewards Accrued</th>
                          <td className="ft-right">{snapshot.system.rewardsAccruedDisplay} TRX</td>
                        </tr>
                        <tr>
                          <th>Rewards Claimed</th>
                          <td className="ft-right">{snapshot.system.rewardsClaimedDisplay} TRX</td>
                        </tr>
                        <tr>
                          <th>Reserved Rewards</th>
                          <td className="ft-right">{snapshot.system.reservedRewardsDisplay} TRX</td>
                        </tr>
                        <tr>
                          <th>Owner Available</th>
                          <td className="ft-right">{snapshot.system.ownerAvailableBalanceDisplay} TRX</td>
                        </tr>
                        <tr>
                          <th>Unallocated Purchase Funds</th>
                          <td className="ft-right">
                            {snapshot.system.unallocatedPurchaseFundsDisplay} TRX
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">
                      <strong>Useful reading:</strong> claimed rewards show what ambassadors have
                      already withdrawn, reserved rewards show what is still ring-fenced for them,
                      and tracked volume shows how much verified purchase flow passed through the
                      controller.
                    </p>
                  </div>
                </article>
              </div>

              <div className="ft-grid ft-grid--2-even ft-ambassador-page__section-grid">
                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">Purchase Footprint</p>
                      <h2 className="ft-subtitle">What the earn pipeline has already processed</h2>
                    </div>

                    <div className="ft-grid ft-grid--2-even ft-ambassador-page__summary-grid">
                      <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                        <p className="ft-card-title-top">Recorded Purchases</p>
                        <h3 className="ft-card-title">{snapshot.db.purchasesTotal}</h3>
                        <p className="ft-text">
                          Purchases tied to ambassadors across processed and pending rows.
                        </p>
                      </article>
                      <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                        <p className="ft-card-title-top">Pending Replay</p>
                        <h3 className="ft-card-title">{snapshot.db.purchasesPending}</h3>
                        <p className="ft-text">
                          Rows still waiting for controller-side processing or operator readiness.
                        </p>
                      </article>
                      <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                        <p className="ft-card-title-top">Withdrawal Events</p>
                        <h3 className="ft-card-title">{snapshot.db.withdrawalsCount}</h3>
                        <p className="ft-text">
                          Confirmed reward withdrawal rows already written by the backend.
                        </p>
                      </article>
                      <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                        <p className="ft-card-title-top">Last Purchase Seen</p>
                        <h3 className="ft-card-title ft-ambassador-page__timestamp-card">
                          {snapshot.db.latestPurchaseLabel}
                        </h3>
                        <p className="ft-text">Latest ambassador-attributed purchase timestamp.</p>
                      </article>
                    </div>

                    <p className="ft-note">
                      Purchases and withdrawals are counted from the backend ledger that the wallet
                      cabinet already uses. This gives the website a public proof layer without
                      needing wallet connection.
                    </p>
                  </div>
                </article>

                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">Runtime Readiness</p>
                      <h2 className="ft-subtitle">Can the operator side process rewards now</h2>
                    </div>

                    <table className="ft-mini-table ft-ambassador-page__mini-table">
                      <tbody>
                        <tr>
                          <th>Operator Wallet</th>
                          <td className="ft-right">{shortenAddress(snapshot.runtime.operatorWallet)}</td>
                        </tr>
                        <tr>
                          <th>Ready Now</th>
                          <td className="ft-right">{snapshot.runtime.readyNow ? "Yes" : "Needs top-up"}</td>
                        </tr>
                        <tr>
                          <th>Energy Available</th>
                          <td className="ft-right">
                            {snapshot.runtime.resourceState?.energyAvailable ??
                              snapshot.runtime.resources?.energyAvailable ??
                              0}
                          </td>
                        </tr>
                        <tr>
                          <th>Bandwidth Available</th>
                          <td className="ft-right">
                            {snapshot.runtime.resourceState?.bandwidthAvailable ??
                              snapshot.runtime.resources?.bandwidthAvailable ??
                              0}
                          </td>
                        </tr>
                        <tr>
                          <th>Need per Allocation</th>
                          <td className="ft-right">
                            {snapshot.runtime.requirements.requiredEnergy} energy /{" "}
                            {snapshot.runtime.requirements.requiredBandwidth} bandwidth
                          </td>
                        </tr>
                        <tr>
                          <th>Safe Floor After Run</th>
                          <td className="ft-right">
                            {snapshot.runtime.requirements.minEnergyFloor} energy /{" "}
                            {snapshot.runtime.requirements.minBandwidthFloor} bandwidth
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">
                      This is the public version of the same idea the wallet uses: if resources are
                      not safe, reward rows queue instead of pretending everything completed.
                    </p>
                  </div>
                </article>
              </div>

              <article className="ft-card ft-ambassador-page__panel">
                <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">Level Ladder</p>
                    <h2 className="ft-subtitle">Buyer count changes the reward share</h2>
                  </div>

                  <div className="ft-grid ft-grid--4 ft-ambassador-page__levels-grid">
                    {snapshot.levels.map((level) => (
                      <article
                        key={level.key}
                        className="ft-card ft-card--plain ft-ambassador-page__level-card"
                      >
                        <p className="ft-card-title-top">{level.buyersRange}</p>
                        <h3 className="ft-card-title">{level.label}</h3>
                        <p className="ft-text">{level.rewardPercent}% reward share on qualified flow.</p>
                      </article>
                    ))}
                  </div>
                </div>
              </article>

              <div className="ft-grid ft-grid--2-even ft-ambassador-page__section-grid">
                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">Earn Flow</p>
                      <h2 className="ft-subtitle">How the product moves from identity to withdrawal</h2>
                    </div>

                    <div className="ft-grid ft-grid--2-even ft-ambassador-page__flow-grid">
                      {earnFlow.map((item) => (
                        <article
                          key={item.title}
                          className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                        >
                          <p className="ft-card-title-top">{item.eyebrow}</p>
                          <h3 className="ft-card-title">{item.title}</h3>
                          <p className="ft-text">{item.text}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">Public Route</p>
                      <h2 className="ft-subtitle">Useful exits from the informational layer</h2>
                    </div>

                    <div className="ft-grid ft-grid--2-even ft-ambassador-page__summary-grid">
                      <a
                        className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                        href={FOURTEEN_CONTROLLER_SCAN_URL}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <p className="ft-card-title-top">Contract</p>
                        <h3 className="ft-card-title">Open FourteenController</h3>
                        <p className="ft-text">
                          Inspect the live contract on TronScan with the same address this page
                          reads.
                        </p>
                      </a>

                      <LoaderLink
                        className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                        href="/app"
                      >
                        <p className="ft-card-title-top">Wallet Route</p>
                        <h3 className="ft-card-title">See the mobile app</h3>
                        <p className="ft-text">
                          Registration, cabinet, and withdrawal UX live in the wallet product.
                        </p>
                      </LoaderLink>
                    </div>

                    <p className="ft-note">
                      Snapshot updated{" "}
                      {new Date(snapshot.loadedAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "medium",
                        timeZone: "UTC",
                      })}{" "}
                      UTC.
                    </p>
                  </div>
                </article>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
