"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Shield,
  Bell,
  Settings,
  Eye,
  Flag,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  MoreHorizontal,
  Activity,
  Zap,
  Target,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Sample wallet data
const walletData = [
  {
    id: 1,
    address: "0x1234...5678",
    status: "Fraud Confirmed",
    riskScore: 95,
    balance: "$45,230.50",
    lastActivity: "2 hours ago",
    tags: ["Gambling", "Scam"],
    connections: 23,
    flaggedTx: 15,
    fullAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    id: 2,
    address: "0x9876...4321",
    status: "Fraud Suspect",
    riskScore: 75,
    balance: "$12,890.25",
    lastActivity: "5 hours ago",
    tags: ["Suspicious Activity"],
    connections: 8,
    flaggedTx: 3,
    fullAddress: "0x9876543210fedcba9876543210fedcba98764321",
  },
  {
    id: 3,
    address: "0xabcd...ef01",
    status: "Healthy",
    riskScore: 15,
    balance: "$89,450.75",
    lastActivity: "1 day ago",
    tags: ["Verified", "KYC Passed"],
    connections: 45,
    flaggedTx: 0,
    fullAddress: "0xabcdef0123456789abcdef0123456789abcdef01",
  },
  {
    id: 4,
    address: "0xdef1...2345",
    status: "Under Investigation",
    riskScore: 60,
    balance: "$23,670.00",
    lastActivity: "3 hours ago",
    tags: ["P2P Trading"],
    connections: 12,
    flaggedTx: 5,
    fullAddress: "0xdef123456789abcdef123456789abcdef12345",
  },
  {
    id: 5,
    address: "0x5678...9abc",
    status: "Healthy",
    riskScore: 25,
    balance: "$156,780.90",
    lastActivity: "6 hours ago",
    tags: ["Exchange", "Verified"],
    connections: 67,
    flaggedTx: 1,
    fullAddress: "0x56789abcdef0123456789abcdef0123456789abc",
  },
];

// Sample transaction data
const transactionData = [
  {
    id: 1,
    from: "0x1234...5678",
    to: "0x9876...4321",
    amount: "$5,230.50",
    type: "Suspicious Transfer",
    status: "Flagged",
    timestamp: "2 hours ago",
    hash: "0xabc123...",
  },
  {
    id: 2,
    from: "0xabcd...ef01",
    to: "0xdef1...2345",
    amount: "$12,450.00",
    type: "P2P Exchange",
    status: "Monitoring",
    timestamp: "4 hours ago",
    hash: "0xdef456...",
  },
  {
    id: 3,
    from: "0x5678...9abc",
    to: "0xabcd...ef01",
    amount: "$890.25",
    type: "Normal Transfer",
    status: "Clear",
    timestamp: "1 day ago",
    hash: "0x789abc...",
  },
];

// Flow chart nodes and connections
const flowData = {
  nodes: [
    {
      id: "0x1234...5678",
      status: "Fraud Confirmed",
      balance: "$45,230",
      x: 100,
      y: 100,
      flags: 15,
    },
    {
      id: "0x9876...4321",
      status: "Fraud Suspect",
      balance: "$12,890",
      x: 300,
      y: 150,
      flags: 3,
    },
    {
      id: "0xabcd...ef01",
      status: "Healthy",
      balance: "$89,450",
      x: 500,
      y: 100,
      flags: 0,
    },
    {
      id: "0xdef1...2345",
      status: "Under Investigation",
      balance: "$23,670",
      x: 300,
      y: 50,
      flags: 5,
    },
  ],
  edges: [
    {
      from: "0x1234...5678",
      to: "0x9876...4321",
      amount: "$5,230",
      timestamp: "2h ago",
    },
    {
      from: "0x9876...4321",
      to: "0xdef1...2345",
      amount: "$2,100",
      timestamp: "3h ago",
    },
    {
      from: "0xabcd...ef01",
      to: "0xdef1...2345",
      amount: "$12,450",
      timestamp: "4h ago",
    },
  ],
};

function getStatusColor(status: string) {
  switch (status) {
    case "Fraud Confirmed":
      return "bg-red-50 text-red-700 border-red-200";
    case "Fraud Suspect":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "Healthy":
      return "bg-green-50 text-green-700 border-green-200";
    case "Under Investigation":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "Fraud Confirmed":
      return "🔴";
    case "Fraud Suspect":
      return "🟡";
    case "Healthy":
      return "🟢";
    case "Under Investigation":
      return "🔵";
    default:
      return "⚪";
  }
}

function getRiskColor(score: number) {
  if (score >= 80) return "text-red-600";
  if (score >= 60) return "text-yellow-600";
  if (score >= 40) return "text-blue-600";
  return "text-green-600";
}

export default function FraudDashboard() {
  const [selectedWallet, setSelectedWallet] = useState(walletData[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const router = useRouter();

  const filteredWallets = useMemo(() => {
    return walletData.filter((wallet) => {
      const matchesSearch =
        wallet.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wallet.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesStatus =
        statusFilter === "All Status" || wallet.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const handleDetailsPage = () => router.push('wallet-details');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">JagaCrypto</h1>
                <p className="text-sm text-gray-500 font-medium">
                  Forensic Intelligence System
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors flex items-center">
              Landing Page
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="relative p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Statistics Cards */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Wallets Card - Blue Theme */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-blue-100">
                Total Wallets
              </h3>
              <Users className="h-5 w-5 text-blue-200" />
            </div>
            <div className="text-2xl font-bold text-white">12,847</div>
            <p className="text-xs text-blue-100">+2.1% from last month</p>
          </div>

          {/* Fraud Confirmed Card - Red Theme */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-red-100">
                Fraud Confirmed
              </h3>
              <Flag className="h-5 w-5 text-red-200" />
            </div>
            <div className="text-2xl font-bold text-white">1,234</div>
            <p className="text-xs text-red-100">+5.2% from last month</p>
          </div>

          {/* Under Investigation Card - Yellow Theme */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-yellow-100">
                Under Investigation
              </h3>
              <Clock className="h-5 w-5 text-yellow-200" />
            </div>
            <div className="text-2xl font-bold text-white">892</div>
            <p className="text-xs text-yellow-100">-1.3% from last month</p>
          </div>

          {/* Active Alerts Card - Purple Theme */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-purple-100">
                Active Alerts
              </h3>
              <AlertTriangle className="h-5 w-5 text-purple-200" />
            </div>
            <div className="text-2xl font-bold text-white">47</div>
            <p className="text-xs text-purple-100">+12.5% from last hour</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Left Column - Wallet List */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Wallet Surveillance
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        placeholder="Search wallets or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-48 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    >
                      <option value="All Status">All Status</option>
                      <option value="Fraud Confirmed">Fraud Confirmed</option>
                      <option value="Fraud Suspect">Fraud Suspect</option>
                      <option value="Healthy">Healthy</option>
                      <option value="Under Investigation">Under Investigation</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {filteredWallets.map((wallet) => (
                    <div
                      key={wallet.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedWallet.id === wallet.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedWallet(wallet)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <code className="text-sm font-mono bg-gray-100 text-blue-600 px-3 py-1 rounded border border-gray-200">
                            {wallet.address}
                          </code>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(wallet.status)}`}>
                            {getStatusIcon(wallet.status)} {wallet.status}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`text-sm font-bold ${getRiskColor(
                              wallet.riskScore
                            )}`}
                          >
                            RISK: {wallet.riskScore}%
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            {wallet.balance}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-6">
                          <span className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            {wallet.lastActivity}
                          </span>
                          <span className="text-blue-600">
                            {wallet.connections} connections
                          </span>
                          <span className="text-red-600">
                            {wallet.flaggedTx} flagged
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDetailsPage();
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors flex items-center"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 mt-3">
                        {wallet.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="text-xs bg-gray-200 text-gray-700 border border-gray-300 px-2 py-1 rounded"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transaction Flow Visualization */}
            <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  Transaction Flow Analysis
                </h2>
              </div>
              <div className="p-6">
                <div className="relative h-64 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    {/* Draw edges first */}
                    {flowData.edges.map((edge, index) => {
                      const fromNode = flowData.nodes.find(
                        (n) => n.id === edge.from
                      );
                      const toNode = flowData.nodes.find(
                        (n) => n.id === edge.to
                      );
                      if (!fromNode || !toNode) return null;

                      return (
                        <g key={index}>
                          <path
                            d={`M ${fromNode.x + 40} ${fromNode.y + 20} Q ${
                              (fromNode.x + toNode.x) / 2
                            } ${fromNode.y - 30} ${toNode.x + 40} ${
                              toNode.y + 20
                            }`}
                            stroke="#6366f1"
                            strokeWidth="2"
                            fill="none"
                            markerEnd="url(#arrowhead)"
                            opacity="0.8"
                          />
                          <text
                            x={(fromNode.x + toNode.x) / 2 + 40}
                            y={(fromNode.y + toNode.y) / 2 - 10}
                            className="text-xs fill-blue-600 font-mono"
                            textAnchor="middle"
                          >
                            {edge.amount}
                          </text>
                        </g>
                      );
                    })}

                    {/* Arrow marker definitions */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                      </marker>
                    </defs>
                  </svg>

                  {/* Draw nodes */}
                  {flowData.nodes.map((node, index) => (
                    <div
                      key={index}
                      className={`absolute w-20 h-10 rounded-lg border-2 flex items-center justify-center text-xs font-mono cursor-pointer transition-all hover:scale-105 ${
                        node.status === "Fraud Confirmed"
                          ? "bg-red-50 border-red-500 text-red-700"
                          : node.status === "Fraud Suspect"
                          ? "bg-yellow-50 border-yellow-500 text-yellow-700"
                          : node.status === "Healthy"
                          ? "bg-green-50 border-green-500 text-green-700"
                          : "bg-blue-50 border-blue-500 text-blue-700"
                      }`}
                      style={{ left: node.x, top: node.y }}
                      title={`${node.id} - ${node.balance} - ${node.flags} flags`}
                    >
                      <div className="text-center">
                        <div className="truncate w-16">{node.id}</div>
                        {node.flags > 0 && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {node.flags}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Recent Transactions
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-6 text-gray-700 font-medium">From</th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium">To</th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium">Amount</th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium">Type</th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium">Status</th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium">Time</th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-6">
                          <code className="text-sm text-blue-600 bg-gray-100 px-2 py-1 rounded">
                            {tx.from}
                          </code>
                        </td>
                        <td className="py-3 px-6">
                          <code className="text-sm text-blue-600 bg-gray-100 px-2 py-1 rounded">
                            {tx.to}
                          </code>
                        </td>
                        <td className="py-3 px-6 font-bold text-gray-900">
                          {tx.amount}
                        </td>
                        <td className="py-3 px-6 text-gray-700">
                          {tx.type}
                        </td>
                        <td className="py-3 px-6">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                              tx.status === "Flagged"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : tx.status === "Monitoring"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-green-50 text-green-700 border-green-200"
                            }`}
                          >
                            {tx.status}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-sm text-gray-500">
                          {tx.timestamp}
                        </td>
                        <td className="py-3 px-6">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Wallet Details */}
          <div className="lg:col-span-3">
            <div className="sticky top-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Target Analysis
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Address
                  </label>
                  <code className="block text-sm font-mono bg-gray-100 text-blue-600 p-3 rounded mt-2 break-all border border-gray-200">
                    {selectedWallet.fullAddress}
                  </code>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Risk Assessment
                  </label>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-2xl font-bold ${getRiskColor(
                          selectedWallet.riskScore
                        )}`}
                      >
                        {selectedWallet.riskScore}%
                      </span>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedWallet.status)}`}>
                        {getStatusIcon(selectedWallet.status)}{" "}
                        {selectedWallet.status}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${selectedWallet.riskScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Balance
                    </label>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedWallet.balance}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Last Activity
                    </label>
                    <p className="text-sm text-blue-600">
                      {selectedWallet.lastActivity}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Connections
                    </label>
                    <p className="text-lg font-bold text-blue-600">
                      {selectedWallet.connections}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Flagged TX
                    </label>
                    <p className="text-lg font-bold text-red-600">
                      {selectedWallet.flaggedTx}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Intelligence Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedWallet.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 text-gray-700 border border-gray-300 px-2 py-1 rounded text-sm hover:bg-gray-300 transition-colors"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-3">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                      <Flag className="h-4 w-4 mr-2" />
                      Flag as Fraud
                    </button>
                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Mark Suspicious
                    </button>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Healthy
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analyze Flow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}