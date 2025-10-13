import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import TableTree, { TableItem } from "./TableTree";

const tables: TableItem[] = [
  {
    id: "blockchain",
    name: "blockchain",
    children: [
      {
        id: "blockchain.acala",
        name: "acala",
        children: [
          { id: "blockchain.acala.blocks", name: "blocks" },
          { id: "blockchain.acala.events", name: "events" },
          { id: "blockchain.acala.extrinsics", name: "extrinsics" },
        ],
      },
      {
        id: "blockchain.ajuna",
        name: "ajuna",
        children: [
          { id: "blockchain.ajuna.blocks", name: "blocks" },
          { id: "blockchain.ajuna.events", name: "events" },
          { id: "blockchain.ajuna.extrinsics", name: "extrinsics" },
        ],
      },
      {
        id: "blockchain.alephzeroevm",
        name: "alephzeroevm",
        children: [
          { id: "blockchain.alephzeroevm.blocks", name: "blocks" },
          { id: "blockchain.alephzeroevm.logs", name: "logs" },
          { id: "blockchain.alephzeroevm.traces", name: "traces" },
          { id: "blockchain.alephzeroevm.transactions", name: "transactions" },
        ],
      },
      {
        id: "blockchain.algorand",
        name: "algorand",
        children: [
          { id: "blockchain.algorand.blocks", name: "blocks" },
          { id: "blockchain.algorand.transactions", name: "transactions" },
        ],
      },
      {
        id: "blockchain.aptos",
        name: "aptos",
        children: [
          { id: "blockchain.aptos.blocks", name: "blocks" },
          { id: "blockchain.aptos.changes", name: "changes" },
          { id: "blockchain.aptos.events", name: "events" },
          { id: "blockchain.aptos.modules", name: "modules" },
        ],
      },
      { id: "blockchain.arbitrum", name: "arbitrum" },
      { id: "blockchain.astar", name: "astar" },
      { id: "blockchain.avalanche", name: "avalanche" },
      { id: "blockchain.aventus", name: "aventus" },
      { id: "blockchain.base", name: "base" },
      { id: "blockchain.berachain", name: "berachain" },
      { id: "blockchain.bifrost", name: "bifrost" },
    ],
  },
  {
    id: "contracts",
    name: "contracts",
    children: [
      {
        id: "contracts.1inch_v1_bsc",
        name: "1inch_v1_bsc",
        children: [
          {
            id: "contracts.1inch_v1_bsc.Mooniswap_Swapped_event",
            name: "Mooniswap_Swapped_event",
          },
          {
            id: "contracts.1inch_v1_bsc.MooniswapFactory_Deployed_event",
            name: "MooniswapFactory_Deployed_event",
          },
        ],
      },
      {
        id: "contracts.1inch_v1_ethereum",
        name: "1inch_v1_ethereum",
        children: [
          {
            id: "contracts.1inch_v1_ethereum.GasRefundProgram_Claimed_event",
            name: "GasRefundProgram_Claimed_event",
          },
          {
            id: "contracts.1inch_v1_ethereum.Mooniswap_Swapped_event",
            name: "Mooniswap_Swapped_event",
          },
          {
            id: "contracts.1inch_v1_ethereum.MooniswapFactory_Deployed_event",
            name: "MooniswapFactory_Deployed_event",
          },
          {
            id: "contracts.1inch_v1_ethereum.OneInchExchange_swap_function",
            name: "OneInchExchange_swap_function",
          },
          {
            id: "contracts.1inch_v1_ethereum.OneInchExchange_Swapped_event",
            name: "OneInchExchange_Swapped_event",
          },
        ],
      },
      {
        id: "contracts.1inch_v2_bsc",
        name: "1inch_v2_bsc",
        children: [
          {
            id: "contracts.1inch_v2_bsc.OneInchExchange_Swapped_event",
            name: "OneInchExchange_Swapped_event",
          },
        ],
      },
      {
        id: "contracts.1inch_v2_ethereum",
        name: "1inch_v2_ethereum",
        children: [
          {
            id: "contracts.1inch_v2_ethereum.LimitOrderProtocol_OrderFilledRFQ_event",
            name: "LimitOrderProtocol_OrderFilledRFQ_event",
          },
          {
            id: "contracts.1inch_v2_ethereum.OneInchExchange_Swapped_event",
            name: "OneInchExchange_Swapped_event",
          },
        ],
      },
      {
        id: "contracts.1inch_v2_polygon",
        name: "1inch_v2_polygon",
        children: [],
      },
      {
        id: "contracts.1inch_v3_bsc",
        name: "1inch_v3_bsc",
        children: [],
      },
      {
        id: "contracts.1inch_v3_ethereum",
        name: "1inch_v3_ethereum",
        children: [
          {
            id: "contracts.1inch_v3_ethereum.AggregationRouterV3_discountedSwap_event",
            name: "AggregationRouterV3_discountedSwap_event",
          },
        ],
      },
    ],
  },
  {
    id: "primitives",
    name: "primitives",
    children: [
      {
        id: "primitives.prices",
        name: "prices",
        children: [
          {
            id: "primitives.prices.prices_end_of_day",
            name: "prices_end_of_day",
          },
          { id: "primitives.prices.prices_per_day", name: "prices_per_day" },
          { id: "primitives.prices.prices_per_hour", name: "prices_per_hour" },
        ],
      },
      {
        id: "primitives.tokens",
        name: "tokens",
        children: [
          { id: "primitives.tokens.token_metadata", name: "token_metadata" },
        ],
      },
    ],
  },
  {
    id: "metrics",
    name: "metrics",
    children: [
      {
        id: "metrics.metrics",
        name: "metrics",
        children: [
          {
            id: "metrics.metrics.ecosystem_metrics",
            name: "ecosystem_metrics",
          },
          { id: "metrics.metrics.metrics", name: "metrics" },
          {
            id: "metrics.metrics.metrics_with_breakdowns",
            name: "metrics_with_breakdowns",
          },
        ],
      },
    ],
  },
];

const ExplorerContent = () => {
  const [showInternalTables, setShowInternalTables] = useState(false);

  return (
    <div className="space-y-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon className="w-4 h-4" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search" />
      </InputGroup>

      {false && (
        <div className="flex items-center space-x-2 py-2">
          <Checkbox
            id="show-internal"
            checked={showInternalTables}
            onCheckedChange={(checked) =>
              setShowInternalTables(checked === true)
            }
          />
          <label
            htmlFor="show-internal"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Show internal tables
          </label>
        </div>
      )}

      <TableTree tables={tables} />
    </div>
  );
};

export default ExplorerContent;
