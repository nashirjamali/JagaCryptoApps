"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Shield,
  Building2,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Flag,
  Eye,
  Download,
  Share,
  Zap,
  Target,
  Activity,
  FileText,
  Link,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

// Sample detailed wallet data
const walletDetail = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  shortAddress: "0x1234...5678",
  status: "Fraud Confirmed",
  riskScore: 95,
  balance: "$45,230.50",
  labels: ["Judi Online Zeus", "Scam Operation", "Money Laundering"],
  firstSeen: "2023-08-15",
  lastActivity: "2 hours ago",
  totalTransactions: 1247,
  flaggedTransactions: 156,
  connectedWallets: 89,
  bankAccounts: [
    {
      id: 1,
      bankName: "Bank Mandiri",
      accountNumber: "1234567890",
      accountName: "PT Zeus Gaming Indonesia",
      status: "Blacklisted",
      lastTransaction: "3 hours ago",
      totalAmount: "$125,450.00",
    },
    {
      id: 2,
      bankName: "Bank BCA",
      accountNumber: "9876543210",
      accountName: "John Doe",
      status: "Suspicious",
      lastTransaction: "1 day ago",
      totalAmount: "$45,230.50",
    },
    {
      id: 3,
      bankName: "Bank BRI",
      accountNumber: "5555666677",
      accountName: "Maria Santos",
      status: "Under Investigation",
      lastTransaction: "2 days ago",
      totalAmount: "$23,890.75",
    },
  ],
  entityInfo: {
    type: "Gambling Platform",
    registeredName: "PT Zeus Gaming Indonesia",
    registrationNumber: "AHU-123456789",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    phone: "+62-21-12345678",
    email: "contact@zeusgaming.id",
    website: "www.zeusgaming.id",
    status: "Illegal Operation",
  },
};

// Complex flow data with more nodes and connections
const complexFlowData = {
  nodes: [
    // Main target wallet
    {
      id: "main",
      address: "0x1234...5678",
      label: "Zeus Gaming",
      balance: "$45,230",
      x: 200,
      y: 150,
      width: 100,
      height: 70,
      status: "Fraud Confirmed",
      flags: 15,
    },

    // Connected gambling wallets
    {
      id: "gamble1",
      address: "0x2345...6789",
      label: "Slot Machine",
      balance: "$23,450",
      x: 50,
      y: 50,
      width: 90,
      height: 60,
      status: "Fraud Confirmed",
      flags: 8,
    },
    {
      id: "gamble2",
      address: "0x3456...789a",
      label: "Poker Room",
      balance: "$34,560",
      x: 350,
      y: 50,
      width: 90,
      height: 60,
      status: "Fraud Suspect",
      flags: 5,
    },
    {
      id: "gamble3",
      address: "0x4567...89ab",
      label: "Sports Bet",
      balance: "$12,340",
      x: 30,
      y: 200,
      width: 85,
      height: 60,
      status: "Under Investigation",
      flags: 3,
    },

    // Money laundering chain
    {
      id: "launder1",
      address: "0x5678...9abc",
      label: "Mixer Service",
      balance: "$89,450",
      x: 400,
      y: 150,
      width: 95,
      height: 65,
      status: "Fraud Confirmed",
      flags: 12,
    },
    {
      id: "launder2",
      address: "0x6789...abcd",
      label: "Shell Company",
      balance: "$156,780",
      x: 450,
      y: 250,
      width: 95,
      height: 65,
      status: "Fraud Suspect",
      flags: 7,
    },

    // Exchange wallets
    {
      id: "exchange1",
      address: "0xabcd...ef01",
      label: "Binance Hot",
      balance: "$2.1M",
      x: 300,
      y: 300,
      width: 100,
      height: 65,
      status: "Healthy",
      flags: 0,
    },
    {
      id: "exchange2",
      address: "0xbcde...f012",
      label: "Coinbase",
      balance: "$1.8M",
      x: 150,
      y: 350,
      width: 95,
      height: 65,
      status: "Healthy",
      flags: 0,
    },

    // Bank connections
    {
      id: "bank1",
      address: "Bank Mandiri",
      label: "PT Zeus Gaming",
      balance: "$125,450",
      x: 200,
      y: 450,
      width: 105,
      height: 60,
      status: "Blacklisted",
      flags: 10,
    },
  ],
  edges: [
    // Victim to main wallet flows
    {
      from: "gamble1",
      to: "main",
      amount: "$15,230",
      type: "Profit Share",
      timestamp: "1h ago",
      suspicious: true,
    },
    {
      from: "gamble2",
      to: "main",
      amount: "$8,450",
      type: "Profit Share",
      timestamp: "2h ago",
      suspicious: true,
    },
    {
      from: "gamble3",
      to: "main",
      amount: "$5,670",
      type: "Profit Share",
      timestamp: "3h ago",
      suspicious: true,
    },

    // Money laundering flows
    {
      from: "main",
      to: "launder1",
      amount: "$25,000",
      type: "Mixing Service",
      timestamp: "30m ago",
      suspicious: true,
    },
    {
      from: "launder1",
      to: "launder2",
      amount: "$23,500",
      type: "Shell Transfer",
      timestamp: "25m ago",
      suspicious: true,
    },
    {
      from: "launder2",
      to: "exchange1",
      amount: "$22,000",
      type: "Exchange Deposit",
      timestamp: "20m ago",
      suspicious: false,
    },

    // Bank connections
    {
      from: "main",
      to: "bank1",
      amount: "$45,230",
      type: "Fiat Withdrawal",
      timestamp: "1h ago",
      suspicious: true,
    },

    // Exchange flows
    {
      from: "main",
      to: "exchange2",
      amount: "$12,340",
      type: "Exchange Deposit",
      timestamp: "4h ago",
      suspicious: false,
    },
  ],
};

// Transaction history
const transactionHistory = [
  {
    id: 1,
    hash: "0xabc123def456...",
    from: "0x7890...bcde",
    to: "0x1234...5678",
    amount: "$2,340.50",
    type: "Gambling Deposit",
    status: "Flagged",
    timestamp: "2 hours ago",
    gasUsed: "21,000",
    gasFee: "$12.50",
  },
  {
    id: 2,
    hash: "0xdef456abc789...",
    from: "0x1234...5678",
    to: "0x5678...9abc",
    amount: "$25,000.00",
    type: "Mixing Service",
    status: "Flagged",
    timestamp: "30 minutes ago",
    gasUsed: "45,000",
    gasFee: "$28.75",
  },
  {
    id: 3,
    hash: "0x789abc123def...",
    from: "0x1234...5678",
    to: "Bank Mandiri",
    amount: "$45,230.50",
    type: "Fiat Withdrawal",
    status: "Flagged",
    timestamp: "1 hour ago",
    gasUsed: "0",
    gasFee: "$0.00",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Fraud Confirmed":
    case "Blacklisted":
      return "bg-red-50 text-red-700 border-red-200";
    case "Fraud Suspect":
    case "Suspicious":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "Healthy":
      return "bg-green-50 text-green-700 border-green-200";
    case "Under Investigation":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

function getNodeColor(status: string) {
  switch (status) {
    case "Fraud Confirmed":
    case "Blacklisted":
      return "bg-red-50 border-red-500 text-red-700";
    case "Fraud Suspect":
    case "Suspicious":
      return "bg-yellow-50 border-yellow-500 text-yellow-700";
    case "Healthy":
      return "bg-green-50 border-green-500 text-green-700";
    case "Under Investigation":
      return "bg-blue-50 border-blue-500 text-blue-700";
    default:
      return "bg-gray-50 border-gray-500 text-gray-700";
  }
}

interface WalletDetailProps {
  onBack: () => void;
}

export default function WalletDetail({ onBack }: WalletDetailProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("flow");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 shadow-sm z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-red-600">
                  Target Analysis
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium hidden sm:block">
                  Detailed Forensic Investigation
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm">
              <Share className="h-4 w-4 mr-2" />
              Share Analysis
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center text-sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center text-sm">
                <Share className="h-4 w-4 mr-2" />
                Share Analysis
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content with top padding for fixed header */}
      <div className="pt-20 sm:pt-24 px-4 sm:px-6 py-6 sm:py-8">
        {/* Wallet Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  Wallet Profile
                </h2>
                <div
                  className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(
                    walletDetail.status
                  )}`}
                >
                  {walletDetail.status}
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Wallet Address
                </label>
                <code className="block text-sm sm:text-lg font-mono bg-gray-100 text-blue-600 p-2 sm:p-3 rounded mt-2 break-all border border-gray-200">
                  {walletDetail.address}
                </code>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gray-50 p-2 sm:p-3 rounded border border-gray-200">
                  <label className="text-xs font-medium text-gray-500 uppercase">
                    Balance
                  </label>
                  <p className="text-sm sm:text-lg font-bold text-gray-900">
                    {walletDetail.balance}
                  </p>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded border border-gray-200">
                  <label className="text-xs font-medium text-gray-500 uppercase">
                    Total TX
                  </label>
                  <p className="text-sm sm:text-lg font-bold text-blue-600">
                    {walletDetail.totalTransactions.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded border border-gray-200">
                  <label className="text-xs font-medium text-gray-500 uppercase">
                    Flagged TX
                  </label>
                  <p className="text-sm sm:text-lg font-bold text-red-600">
                    {walletDetail.flaggedTransactions}
                  </p>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded border border-gray-200">
                  <label className="text-xs font-medium text-gray-500 uppercase">
                    Connections
                  </label>
                  <p className="text-sm sm:text-lg font-bold text-purple-600">
                    {walletDetail.connectedWallets}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Intelligence Labels
                </label>
                <div className="flex flex-wrap gap-2 mt-3">
                  {walletDetail.labels.map((label, index) => (
                    <div
                      key={index}
                      className="bg-red-50 text-red-700 border border-red-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center"
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Risk Assessment
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-red-600">
                    {walletDetail.riskScore}%
                  </span>
                  <span className="text-xs sm:text-sm text-red-700 uppercase font-medium">
                    Critical
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                  <div
                    className="bg-red-600 h-3 sm:h-4 rounded-full transition-all duration-300"
                    style={{ width: `${walletDetail.riskScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">First Seen</span>
                  <span className="text-gray-900">
                    {walletDetail.firstSeen}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Last Activity</span>
                  <span className="text-blue-600">
                    {walletDetail.lastActivity}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Entity Type</span>
                  <span className="text-red-600">
                    {walletDetail.entityInfo.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="space-y-4 sm:space-y-6">
          {/* Mobile Tab Selector */}
          <div className="bg-white border border-gray-200 rounded-lg p-1 sm:p-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
              <button
                onClick={() => setActiveTab("flow")}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === "flow"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Transaction</span> Flow
              </button>
              <button
                onClick={() => setActiveTab("banks")}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === "banks"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Bank</span> Accounts
              </button>
              <button
                onClick={() => setActiveTab("entity")}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === "entity"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Entity</span> Info
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === "transactions"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Transaction</span> History
              </button>
            </div>
          </div>

          {/* Transaction Flow Tab */}
          {activeTab === "flow" && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  Transaction Flow Analysis
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="relative h-64 sm:h-96 lg:h-[500px] bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    {/* Draw edges */}
                    {complexFlowData.edges.map((edge, index) => {
                      const fromNode = complexFlowData.nodes.find(
                        (n) => n.id === edge.from
                      );
                      const toNode = complexFlowData.nodes.find(
                        (n) => n.id === edge.to
                      );
                      if (!fromNode || !toNode) return null;

                      const strokeColor = edge.suspicious
                        ? "#ef4444"
                        : "#6366f1";
                      const strokeWidth = edge.suspicious ? "3" : "2";

                      // Calculate connection points from center of nodes
                      const fromX = fromNode.x + fromNode.width / 2;
                      const fromY = fromNode.y + fromNode.height / 2;
                      const toX = toNode.x + toNode.width / 2;
                      const toY = toNode.y + toNode.height / 2;

                      // Calculate label position
                      const labelX = (fromX + toX) / 2;
                      const labelY = (fromY + toY) / 2 - 10;

                      return (
                        <g key={index}>
                          <path
                            d={`M ${fromX} ${fromY} L ${toX} ${toY}`}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            fill="none"
                            markerEnd="url(#arrowhead)"
                            opacity="0.8"
                          />
                          {/* Transaction amount label with background */}
                          <rect
                            x={labelX - 20}
                            y={labelY - 6}
                            width="40"
                            height="12"
                            fill="white"
                            stroke={strokeColor}
                            strokeWidth="1"
                            rx="6"
                            opacity="0.9"
                          />
                          <text
                            x={labelX}
                            y={labelY + 3}
                            className="text-xs font-mono font-bold"
                            textAnchor="middle"
                            fill={strokeColor}
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
                  {complexFlowData.nodes.map((node, index) => (
                    <div
                      key={index}
                      className={`absolute rounded-lg border-2 flex flex-col items-center justify-center text-xs font-mono cursor-pointer transition-all hover:scale-105 p-1 ${
                        selectedNode === node.id ? "ring-2 ring-blue-400" : ""
                      } ${getNodeColor(node.status)}`}
                      style={{
                        left: node.x,
                        top: node.y,
                        width: node.width,
                        height: node.height,
                        minWidth: "60px",
                      }}
                      onClick={() => setSelectedNode(node.id)}
                      title={`${node.label} - ${node.balance} - ${node.flags} flags`}
                    >
                      <div className="text-center w-full h-full flex flex-col justify-center">
                        <div className="font-bold text-xs mb-1 leading-tight">
                          {node.label}
                        </div>
                        <div className="text-xs opacity-80 mb-1 break-all leading-tight">
                          {node.address}
                        </div>
                        <div className="text-xs font-bold">{node.balance}</div>
                        {node.flags > 0 && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {node.flags}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedNode && (
                  <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-blue-600 font-bold mb-2 text-sm sm:text-base">
                      Selected Node Details
                    </h4>
                    {(() => {
                      const node = complexFlowData.nodes.find(
                        (n) => n.id === selectedNode
                      );
                      return node ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div>
                            <span className="text-gray-500">Flags:</span>
                            <span className="text-red-600 ml-2">
                              {node.flags}
                            </span>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bank Accounts Tab */}
          {activeTab === "banks" && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  Connected Bank Accounts
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {walletDetail.bankAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2 sm:gap-0">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                              {account.bankName}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {account.accountName}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border self-start sm:self-auto ${getStatusColor(
                            account.status
                          )}`}
                        >
                          {account.status}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          <span className="text-gray-500">Account Number:</span>
                          <p className="text-gray-900 font-mono break-all">
                            {account.accountNumber}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Total Amount:</span>
                          <p className="text-green-600 font-bold">
                            {account.totalAmount}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            Last Transaction:
                          </span>
                          <p className="text-blue-600">
                            {account.lastTransaction}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button className="border border-gray-300 text-blue-600 hover:bg-gray-100 px-3 py-1 rounded text-xs sm:text-sm transition-colors flex items-center justify-center">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </button>
                          <button className="border border-gray-300 text-red-600 hover:bg-gray-100 px-3 py-1 rounded text-xs sm:text-sm transition-colors flex items-center justify-center">
                            <Flag className="h-3 w-3 mr-1" />
                            Flag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Entity Information Tab */}
          {activeTab === "entity" && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                  Entity Information
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Registered Name
                      </label>
                      <p className="text-sm sm:text-base text-gray-900 font-semibold mt-1 break-words">
                        {walletDetail.entityInfo.registeredName}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Registration Number
                      </label>
                      <p className="text-sm sm:text-base text-gray-900 font-mono mt-1 break-all">
                        {walletDetail.entityInfo.registrationNumber}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Business Type
                      </label>
                      <p className="text-sm sm:text-base text-red-600 font-semibold mt-1">
                        {walletDetail.entityInfo.type}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Status
                      </label>
                      <div className="mt-1 inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border bg-red-50 text-red-700 border-red-200">
                        {walletDetail.entityInfo.status}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Address
                      </label>
                      <p className="text-sm sm:text-base text-gray-900 mt-1 break-words">
                        {walletDetail.entityInfo.address}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        Phone
                      </label>
                      <p className="text-sm sm:text-base text-gray-900 font-mono mt-1 break-all">
                        {walletDetail.entityInfo.phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        Email
                      </label>
                      <p className="text-sm sm:text-base text-blue-600 mt-1 break-all">
                        {walletDetail.entityInfo.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1">
                        <Link className="h-3 w-3" />
                        Website
                      </label>
                      <p className="text-sm sm:text-base text-blue-600 mt-1 flex items-center gap-1 break-all">
                        {walletDetail.entityInfo.website}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transaction History Tab */}
          {activeTab === "transactions" && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  Transaction History
                </h2>
              </div>

              {/* Mobile Card View */}
              <div className="block sm:hidden">
                <div className="p-4 space-y-4">
                  {transactionHistory.map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <code className="text-xs text-blue-600 bg-gray-100 px-2 py-1 rounded">
                            {tx.hash.substring(0, 12)}...
                          </code>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                              tx.status === "Flagged"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-green-50 text-green-700 border-green-200"
                            }`}
                          >
                            {tx.status}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">From:</div>
                          <code className="text-sm text-blue-600 bg-gray-100 px-2 py-1 rounded break-all">
                            {tx.from}
                          </code>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">To:</div>
                          <code className="text-sm text-blue-600 bg-gray-100 px-2 py-1 rounded break-all">
                            {tx.to}
                          </code>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs text-gray-500">Amount:</div>
                            <div className="font-bold text-gray-900">
                              {tx.amount}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">Type:</div>
                            <div className="text-sm text-gray-700">
                              {tx.type}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{tx.timestamp}</span>
                          <span>
                            Gas: {tx.gasUsed} ({tx.gasFee})
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-6 text-gray-700 font-medium text-sm">
                        Hash
                      </th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium text-sm">
                        From
                      </th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium text-sm">
                        To
                      </th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium text-sm">
                        Amount
                      </th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium text-sm">
                        Type
                      </th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium text-sm">
                        Status
                      </th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium text-sm">
                        Time
                      </th>
                      <th className="text-left py-3 px-6 text-gray-700 font-medium text-sm">
                        Gas
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-6">
                          <code className="text-xs text-blue-600 bg-gray-100 px-2 py-1 rounded">
                            {tx.hash.substring(0, 12)}...
                          </code>
                        </td>
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
                        <td className="py-3 px-6 text-gray-700">{tx.type}</td>
                        <td className="py-3 px-6">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                              tx.status === "Flagged"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-green-50 text-green-700 border-green-200"
                            }`}
                          >
                            {tx.status}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-sm text-gray-500">
                          {tx.timestamp}
                        </td>
                        <td className="py-3 px-6 text-sm text-gray-500">
                          <div>
                            <div>{tx.gasUsed}</div>
                            <div className="text-xs text-green-600">
                              {tx.gasFee}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
