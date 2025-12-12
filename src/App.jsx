import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Bell, Settings, User, PlusCircle, Play, Pause, BarChart3, Wallet, Shield, Bot, ChevronRight, Menu, X, Eye, Zap, Target, Clock, DollarSign, Percent, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Layers, Sliders, LineChart, CandlestickChart, Home, BookOpen, PieChart } from 'lucide-react';

// Mobile Bottom Navigation Component
const MobileNav = ({ activeTab, setActiveTab }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 px-2 py-2 flex justify-around items-center z-50">
    {[
      { id: 'home', icon: Home, label: 'Home' },
      { id: 'strategies', icon: Layers, label: 'Stratégies' },
      { id: 'trades', icon: BarChart3, label: 'Trades' },
      { id: 'alerts', icon: Bell, label: 'Alertes' },
      { id: 'profile', icon: User, label: 'Profil' },
    ].map(item => (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        className={`flex flex-col items-center p-2 rounded-lg transition-all ${
          activeTab === item.id ? 'text-emerald-400 bg-slate-800' : 'text-slate-400'
        }`}
      >
        <item.icon size={20} />
        <span className="text-xs mt-1">{item.label}</span>
      </button>
    ))}
  </div>
);

// Strategy Card Component
const StrategyCard = ({ name, status, profit, trades, pair, isActive }) => (
  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-semibold text-white">{name}</h3>
        <span className="text-xs text-slate-400">{pair}</span>
      </div>
      <div className={`px-2 py-1 rounded-full text-xs ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600/50 text-slate-400'}`}>
        {status}
      </div>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1">
        {profit >= 0 ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-red-400" />}
        <span className={profit >= 0 ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'}>
          {profit >= 0 ? '+' : ''}{profit}%
        </span>
      </div>
      <span className="text-xs text-slate-400">{trades} trades</span>
    </div>
  </div>
);

// Signal Indicator Component
const SignalIndicator = ({ indicator, value, signal, confidence }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${
        signal === 'buy' ? 'bg-emerald-400' : signal === 'sell' ? 'bg-red-400' : 'bg-yellow-400'
      }`} />
      <span className="text-sm text-slate-300">{indicator}</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-sm font-mono text-white">{value}</span>
      <div className="w-16 bg-slate-700 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full ${signal === 'buy' ? 'bg-emerald-400' : signal === 'sell' ? 'bg-red-400' : 'bg-yellow-400'}`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  </div>
);

// Trade Row Component
const TradeRow = ({ pair, type, amount, price, pnl, time }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${type === 'BUY' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
        {type === 'BUY' ? <ArrowUpRight size={16} className="text-emerald-400" /> : <ArrowDownRight size={16} className="text-red-400" />}
      </div>
      <div>
        <p className="font-medium text-white">{pair}</p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-medium text-white">${price}</p>
      <p className={`text-xs ${pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        {pnl >= 0 ? '+' : ''}{pnl}%
      </p>
    </div>
  </div>
);

// Main App Component
export default function SraitoMockup() {
  const [view, setView] = useState('web');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [mobileTab, setMobileTab] = useState('home');
  const [showBuilder, setShowBuilder] = useState(false);

  // Web Dashboard View
  const WebDashboard = () => (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white">Sraito</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard' },
            { id: 'strategies', icon: Layers, label: 'Stratégies' },
            { id: 'builder', icon: Sliders, label: 'Strategy Builder' },
            { id: 'indicators', icon: Activity, label: 'Indicateurs' },
            { id: 'backtest', icon: Clock, label: 'Backtest' },
            { id: 'trades', icon: BarChart3, label: 'Historique' },
            { id: 'risk', icon: Shield, label: 'Risk Manager' },
            { id: 'ai', icon: Bot, label: 'IA Assistant' },
            { id: 'notifications', icon: Bell, label: 'Alertes' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if(item.id === 'builder') setShowBuilder(true);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeSection === item.id 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-slate-800">
          <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-emerald-400">PLAN PRO</span>
              <CheckCircle size={14} className="text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400">5 stratégies actives</p>
            <p className="text-xs text-slate-400">Trading réel activé</p>
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Settings size={18} />
            <span className="text-sm">Paramètres</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="sticky top-0 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex justify-between items-center z-40">
          <div>
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            <p className="text-sm text-slate-400">Vue d'ensemble de votre trading</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-emerald-400">Binance connecté</span>
            </div>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-all relative">
              <Bell size={20} className="text-slate-400" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">JD</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Balance', value: '$12,458.32', change: '+2.4%', positive: true, icon: Wallet },
              { label: 'P&L Aujourd\'hui', value: '+$342.18', change: '+1.2%', positive: true, icon: TrendingUp },
              { label: 'Trades Actifs', value: '3', change: '2 en profit', positive: true, icon: Activity },
              { label: 'Win Rate', value: '68%', change: '+5% vs sem.', positive: true, icon: Target },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-slate-400">{stat.label}</span>
                  <stat.icon size={18} className="text-slate-500" />
                </div>
                <p className="text-2xl font-semibold text-white mb-1">{stat.value}</p>
                <span className={`text-xs ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Strategies */}
            <div className="col-span-2 bg-slate-900/50 rounded-xl border border-slate-800 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-white">Mes Stratégies</h2>
                <button 
                  onClick={() => setShowBuilder(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg transition-all"
                >
                  <PlusCircle size={16} />
                  Nouvelle
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <StrategyCard name="RSI Momentum" status="Active" profit={12.4} trades={47} pair="BTC/USDT" isActive={true} />
                <StrategyCard name="MACD Crossover" status="Active" profit={8.2} trades={32} pair="ETH/USDT" isActive={true} />
                <StrategyCard name="Ichimoku Cloud" status="Simulation" profit={-2.1} trades={18} pair="SOL/USDT" isActive={false} />
                <StrategyCard name="Multi-Signal" status="Active" profit={15.7} trades={64} pair="BTC/USDT" isActive={true} />
              </div>
            </div>

            {/* Live Signals */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-white">Signaux Live</h2>
                <span className="text-xs text-slate-400">BTC/USDT</span>
              </div>
              <div className="space-y-1">
                <SignalIndicator indicator="RSI (14)" value="32.4" signal="buy" confidence={75} />
                <SignalIndicator indicator="MACD" value="Cross ↑" signal="buy" confidence={85} />
                <SignalIndicator indicator="Ichimoku" value="Above" signal="buy" confidence={60} />
                <SignalIndicator indicator="Volume" value="High" signal="neutral" confidence={50} />
                <SignalIndicator indicator="EMA 200" value="Support" signal="buy" confidence={70} />
              </div>
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Bot size={16} className="text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">IA Recommandation</span>
                </div>
                <p className="text-xs text-slate-300">Signal BUY fort (Confluence 4/5). Confiance: 78%</p>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Recent Trades */}
            <div className="col-span-2 bg-slate-900/50 rounded-xl border border-slate-800 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-white">Trades Récents</h2>
                <button className="text-sm text-emerald-400 hover:text-emerald-300">Voir tout</button>
              </div>
              <div className="space-y-1">
                <TradeRow pair="BTC/USDT" type="BUY" amount="0.15" price="42,350" pnl={2.4} time="Il y a 2h" />
                <TradeRow pair="ETH/USDT" type="SELL" amount="2.5" price="2,245" pnl={-0.8} time="Il y a 5h" />
                <TradeRow pair="SOL/USDT" type="BUY" amount="45" price="98.20" pnl={3.2} time="Il y a 8h" />
                <TradeRow pair="BTC/USDT" type="SELL" amount="0.08" price="43,120" pnl={1.8} time="Hier" />
              </div>
            </div>

            {/* Risk Overview */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
              <h2 className="font-semibold text-white mb-4">Risk Manager</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Exposition</span>
                    <span className="text-white">35%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Trades/Jour</span>
                    <span className="text-white">7/10</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Drawdown</span>
                    <span className="text-white">-2.1%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '21%' }} />
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-emerald-400" />
                    <span className="text-slate-300">Tous les paramètres OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <div>
                <h2 className="text-lg font-semibold text-white">Strategy Builder</h2>
                <p className="text-sm text-slate-400">Créez votre stratégie sans code</p>
              </div>
              <button onClick={() => setShowBuilder(false)} className="p-2 hover:bg-slate-800 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="p-6 overflow-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-2 gap-6">
                {/* Left - Indicators Selection */}
                <div className="space-y-4">
                  <h3 className="font-medium text-white">1. Choisir les indicateurs</h3>
                  <div className="space-y-2">
                    {['RSI', 'MACD', 'Ichimoku Cloud', 'EMA', 'Bollinger Bands'].map((ind, i) => (
                      <div key={i} className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        i < 2 ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white">{ind}</span>
                          {i < 2 && <CheckCircle size={16} className="text-emerald-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right - Rules Builder */}
                <div className="space-y-4">
                  <h3 className="font-medium text-white">2. Définir les règles</h3>
                  <div className="space-y-2">
                    {/* Rule Block */}
                    <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">IF</span>
                        <span className="text-sm text-white">RSI (14)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select className="bg-slate-700 border-0 rounded px-2 py-1 text-sm text-white">
                          <option>est inférieur à</option>
                          <option>est supérieur à</option>
                          <option>croise au-dessus</option>
                        </select>
                        <input type="number" defaultValue="30" className="w-16 bg-slate-700 border-0 rounded px-2 py-1 text-sm text-white" />
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">AND</span>
                    </div>

                    <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">IF</span>
                        <span className="text-sm text-white">MACD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select className="bg-slate-700 border-0 rounded px-2 py-1 text-sm text-white">
                          <option>croise au-dessus</option>
                          <option>croise en-dessous</option>
                        </select>
                        <span className="text-sm text-slate-400">Signal Line</span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">THEN</span>
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-emerald-400">→ BUY</span>
                        <span className="text-xs text-slate-400">10% du capital</span>
                      </div>
                    </div>

                    <button className="w-full py-2 border border-dashed border-slate-600 rounded-lg text-sm text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-all">
                      + Ajouter une condition
                    </button>
                  </div>
                </div>
              </div>

              {/* Risk Settings */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <h3 className="font-medium text-white mb-4">3. Paramètres de risque</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Sizing</label>
                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
                      <option>% du capital</option>
                      <option>Montant fixe</option>
                      <option>IA adaptive</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Take Profit</label>
                    <input type="text" defaultValue="5%" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Stop Loss</label>
                    <input type="text" defaultValue="2%" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-700 flex justify-between">
              <button className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-all">
                Sauvegarder brouillon
              </button>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-all">
                  Backtest
                </button>
                <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg transition-all">
                  Activer la stratégie
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Mobile View
  const MobileView = () => (
    <div className="w-full max-w-md mx-auto bg-slate-950 min-h-screen relative pb-20">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3 z-40">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">Sraito</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-xs text-emerald-400">Live</span>
            </div>
            <button className="p-2 relative">
              <Bell size={20} className="text-slate-400" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="p-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Balance totale</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-white">$12,458</span>
            <span className="text-emerald-400 text-sm">.32</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-emerald-400 text-sm">+$342.18 (2.8%)</span>
            <span className="text-slate-500 text-xs">aujourd'hui</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Trades', value: '3', sub: 'actifs' },
            { label: 'Win Rate', value: '68%', sub: '+5%' },
            { label: 'Stratégies', value: '4', sub: '3 actives' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/50 rounded-xl p-3 border border-slate-800 text-center">
              <p className="text-xl font-semibold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Active Signals */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-white">Signal Actif</h3>
            <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">BTC/USDT</span>
          </div>
          
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">BUY Signal</span>
              </div>
              <span className="text-xs text-slate-400">Confiance: 78%</span>
            </div>
            <p className="text-xs text-slate-300">Confluence RSI + MACD + Ichimoku (4/5)</p>
          </div>

          <div className="space-y-2">
            {[
              { name: 'RSI', value: '32.4', signal: 'buy' },
              { name: 'MACD', value: 'Cross ↑', signal: 'buy' },
              { name: 'Ichimoku', value: 'Above', signal: 'buy' },
            ].map((ind, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${ind.signal === 'buy' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  <span className="text-sm text-slate-300">{ind.name}</span>
                </div>
                <span className="text-sm font-mono text-white">{ind.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strategies List */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-white">Mes Stratégies</h3>
            <button className="text-sm text-emerald-400">Voir tout</button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'RSI Momentum', pair: 'BTC/USDT', profit: 12.4, active: true },
              { name: 'MACD Crossover', pair: 'ETH/USDT', profit: 8.2, active: true },
              { name: 'Ichimoku Cloud', pair: 'SOL/USDT', profit: -2.1, active: false },
            ].map((strat, i) => (
              <div key={i} className="bg-slate-900/50 rounded-xl p-3 border border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${strat.active ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  <div>
                    <p className="font-medium text-white text-sm">{strat.name}</p>
                    <p className="text-xs text-slate-400">{strat.pair}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium text-sm ${strat.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {strat.profit >= 0 ? '+' : ''}{strat.profit}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-white">Trades Récents</h3>
            <button className="text-sm text-emerald-400">Historique</button>
          </div>
          <div className="space-y-3">
            {[
              { pair: 'BTC/USDT', type: 'BUY', price: '42,350', pnl: 2.4, time: '2h' },
              { pair: 'ETH/USDT', type: 'SELL', price: '2,245', pnl: -0.8, time: '5h' },
            ].map((trade, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${trade.type === 'BUY' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                    {trade.type === 'BUY' ? 
                      <ArrowUpRight size={14} className="text-emerald-400" /> : 
                      <ArrowDownRight size={14} className="text-red-400" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{trade.pair}</p>
                    <p className="text-xs text-slate-400">Il y a {trade.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">${trade.price}</p>
                  <p className={`text-xs ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {trade.pnl >= 0 ? '+' : ''}{trade.pnl}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav activeTab={mobileTab} setActiveTab={setMobileTab} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* View Switcher */}
      <div className="fixed top-4 right-4 z-50 flex bg-slate-800 rounded-lg p-1 border border-slate-700">
        <button
          onClick={() => setView('web')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            view === 'web' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          💻 Web
        </button>
        <button
          onClick={() => setView('mobile')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            view === 'mobile' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          📱 Mobile
        </button>
      </div>

      {view === 'web' ? <WebDashboard /> : (
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="border-8 border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
            <MobileView />
          </div>
        </div>
      )}
    </div>
  );
}
