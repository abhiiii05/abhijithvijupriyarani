export function VascoFlow() {
  return (
    <div className="diagram-box">
      <svg
        viewBox="0 0 600 150"
        role="img"
        aria-labelledby="vasco-title vasco-desc"
      >
        <title id="vasco-title">Vasco Foods production e-commerce flow</title>
        <desc id="vasco-desc">
          Customer to the live storefront at vascofoods.in, into the production
          backend, then to Razorpay for payments and Shiprocket for courier
          logistics.
        </desc>
        <defs>
          <marker
            id="vasco-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e2924" />
          </marker>
        </defs>
        <rect className="pipe-node" x="8" y="52" width="92" height="46" />
        <text className="pipe-label" x="20" y="73">
          Customer
        </text>
        <text className="pipe-sub" x="20" y="87">
          live traffic
        </text>

        <rect className="pipe-node" x="128" y="52" width="132" height="46" />
        <text className="pipe-label" x="140" y="73">
          vascofoods.in
        </text>
        <text className="pipe-sub" x="140" y="87">
          storefront
        </text>

        <rect
          className="pipe-node-accent"
          x="288"
          y="52"
          width="120"
          height="46"
        />
        <text className="pipe-label" x="300" y="73">
          Backend
        </text>
        <text className="pipe-sub" x="300" y="87">
          integrations
        </text>

        <rect className="pipe-node" x="436" y="16" width="150" height="42" />
        <text className="pipe-label" x="448" y="34">
          Razorpay
        </text>
        <text className="pipe-sub" x="448" y="47">
          payments
        </text>

        <rect className="pipe-node" x="436" y="92" width="150" height="42" />
        <text className="pipe-label" x="448" y="110">
          Shiprocket
        </text>
        <text className="pipe-sub" x="448" y="123">
          courier logistics
        </text>

        <path
          className="pipe-line"
          d="M 100 75 H 128"
          markerEnd="url(#vasco-arrow)"
        />
        <path
          className="pipe-line"
          d="M 260 75 H 288"
          markerEnd="url(#vasco-arrow)"
        />
        <path
          className="pipe-line"
          d="M 408 70 C 420 70, 420 37, 436 37"
          markerEnd="url(#vasco-arrow)"
        />
        <path
          className="pipe-line"
          d="M 408 80 C 420 80, 420 113, 436 113"
          markerEnd="url(#vasco-arrow)"
        />
        <text className="pipe-sub" x="8" y="136">
          FIG. 02A · PRODUCTION · LIVE
        </text>
        <text className="pipe-sub" x="480" y="136">
          VIA PIIXELTHEORY
        </text>
      </svg>
    </div>
  );
}

export function SolariumFlow() {
  return (
    <div className="diagram-box">
      <svg
        viewBox="0 0 600 150"
        role="img"
        aria-labelledby="solarium-title solarium-desc"
      >
        <title id="solarium-title">Solarium Green Energy contract scope</title>
        <desc id="solarium-desc">
          A BSE-listed solar EPC firm signed a multi-year contract covering a
          full website rebuild and a new e-commerce vertical for solar panel
          sales.
        </desc>
        <defs>
          <marker
            id="solar-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e2924" />
          </marker>
        </defs>
        <rect className="pipe-node" x="8" y="30" width="184" height="80" />
        <text className="pipe-label" x="22" y="55">
          Solarium
        </text>
        <text className="pipe-label" x="22" y="69">
          Green Energy
        </text>
        <text className="pipe-sub" x="22" y="88">
          BSE-listed solar EPC
        </text>
        <text className="pipe-sub" x="22" y="100">
          multi-year contract
        </text>

        <rect className="pipe-node" x="252" y="14" width="210" height="44" />
        <text className="pipe-label" x="266" y="34">
          Website rebuild
        </text>
        <text className="pipe-sub" x="266" y="48">
          full rebuild
        </text>

        <rect className="pipe-node-accent" x="252" y="80" width="210" height="44" />
        <text className="pipe-label" x="266" y="100">
          Solar e-commerce
        </text>
        <text className="pipe-sub" x="266" y="114">
          new vertical · panel sales
        </text>

        <rect className="pipe-node" x="506" y="47" width="86" height="46" />
        <text className="pipe-label" x="518" y="68">
          PiixelTheory
        </text>
        <text className="pipe-sub" x="518" y="82">
          backend owner
        </text>

        <path
          className="pipe-line"
          d="M 192 58 C 220 58, 224 36, 252 36"
          markerEnd="url(#solar-arrow)"
        />
        <path
          className="pipe-line"
          d="M 192 86 C 220 86, 224 102, 252 102"
          markerEnd="url(#solar-arrow)"
        />
        <path
          className="pipe-line"
          d="M 462 58 C 480 58, 488 64, 506 66"
          markerEnd="url(#solar-arrow)"
        />
        <text className="pipe-sub" x="8" y="140">
          FIG. 02B · CONTRACT SCOPE
        </text>
      </svg>
    </div>
  );
}

export function AgentLoop() {
  return (
    <div className="diagram-box">
      <svg
        viewBox="0 0 580 330"
        role="img"
        aria-labelledby="agent-title agent-desc"
      >
        <title id="agent-title">
          Claude Code agent: ReAct reasoning loop with tool calls
        </title>
        <desc id="agent-desc">
          The agent plans, acts through Read, Write and Bash tools, observes the
          result, and self-corrects before the next step. It handles fifteen or
          more file operations per task. New tools register without changing the
          core loop.
        </desc>
        <defs>
          <marker
            id="agent-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e2924" />
          </marker>
        </defs>

        <circle
          cx="290"
          cy="165"
          r="118"
          fill="none"
          stroke="#b9b3a1"
          strokeWidth="1"
          strokeDasharray="4 5"
        />

        <rect className="pipe-node" x="220" y="18" width="140" height="48" />
        <text className="pipe-label" x="236" y="39">
          01 Plan
        </text>
        <text className="pipe-sub" x="236" y="54">
          decompose the task
        </text>

        <rect className="pipe-node" x="408" y="140" width="152" height="56" />
        <text className="pipe-label" x="424" y="161">
          02 Act
        </text>
        <text className="pipe-sub" x="424" y="176">
          Read / Write / Bash
        </text>
        <text className="pipe-sub" x="424" y="187">
          tool calls
        </text>

        <rect className="pipe-node" x="220" y="264" width="140" height="48" />
        <text className="pipe-label" x="236" y="285">
          03 Observe
        </text>
        <text className="pipe-sub" x="236" y="300">
          tool result
        </text>

        <rect className="pipe-node-accent" x="20" y="140" width="152" height="56" />
        <text className="pipe-label" x="36" y="161">
          04 Correct
        </text>
        <text className="pipe-sub" x="36" y="176">
          retry or replan
        </text>
        <text className="pipe-sub" x="36" y="187">
          same loop
        </text>

        <path
          className="pipe-line"
          d="M 360 66 C 418 66, 440 104, 452 140"
          markerEnd="url(#agent-arrow)"
        />
        <path
          className="pipe-line"
          d="M 440 196 C 420 236, 376 264, 360 272"
          markerEnd="url(#agent-arrow)"
        />
        <path
          className="pipe-line"
          d="M 220 288 C 160 288, 112 246, 104 196"
          markerEnd="url(#agent-arrow)"
        />
        <path
          className="pipe-line"
          d="M 96 140 C 100 96, 154 52, 220 43"
          markerEnd="url(#agent-arrow)"
        />

        <text className="pipe-label" x="232" y="154">
          15+ file
        </text>
        <text className="pipe-label" x="232" y="170">
          operations
        </text>
        <text className="pipe-sub" x="232" y="186">
          per task
        </text>
        <text className="pipe-sub" x="196" y="322">
          FIG. 04 · REACT LOOP · TOOLS REGISTERED, CORE LOOP FIXED
        </text>
      </svg>
    </div>
  );
}

export function ObeliskFlow() {
  return (
    <div className="diagram-box">
      <svg
        viewBox="0 0 620 160"
        role="img"
        aria-labelledby="obelisk-title obelisk-desc"
      >
        <title id="obelisk-title">
          Obelisk on-chain product authenticity verification
        </title>
        <desc id="obelisk-desc">
          A product entry and its metadata are pinned to IPFS through Pinata, a
          record is written to a Solidity contract, and a lookup resolves the
          product in under two seconds. More than fifty product entries were
          recorded. Contracts were tested locally with Hardhat.
        </desc>
        <defs>
          <marker
            id="obelisk-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e2924" />
          </marker>
        </defs>
        <rect className="pipe-node" x="8" y="48" width="120" height="56" />
        <text className="pipe-label" x="22" y="69">
          Product
        </text>
        <text className="pipe-sub" x="22" y="84">
          entry + metadata
        </text>

        <rect className="pipe-node" x="164" y="48" width="128" height="56" />
        <text className="pipe-label" x="178" y="69">
          IPFS
        </text>
        <text className="pipe-sub" x="178" y="84">
          Pinata pin
        </text>

        <rect
          className="pipe-node-accent"
          x="328"
          y="48"
          width="136"
          height="56"
        />
        <text className="pipe-label" x="342" y="69">
          Solidity
        </text>
        <text className="pipe-sub" x="342" y="84">
          on-chain record
        </text>

        <rect className="pipe-node" x="500" y="48" width="112" height="56" />
        <text className="pipe-label" x="514" y="69">
          Lookup
        </text>
        <text className="pipe-sub" x="514" y="84">
          &lt; 2 seconds
        </text>

        <path
          className="pipe-line"
          d="M 128 76 H 164"
          markerEnd="url(#obelisk-arrow)"
        />
        <path
          className="pipe-line"
          d="M 292 76 H 328"
          markerEnd="url(#obelisk-arrow)"
        />
        <path
          className="pipe-line"
          d="M 464 76 H 500"
          markerEnd="url(#obelisk-arrow)"
        />
        <text className="pipe-sub" x="8" y="138">
          FIG. 05 · 50+ PRODUCT ENTRIES · HARDHAT-TESTED CONTRACTS
        </text>
        <text className="pipe-sub" x="470" y="138">
          NEXT.JS · ETHERS.JS
        </text>
      </svg>
    </div>
  );
}
