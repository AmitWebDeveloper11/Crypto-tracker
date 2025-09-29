import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CoinDetail from './pages/coin-detail';
import TransactionHistory from './pages/transaction-history';
import Dashboard from './pages/dashboard';
import AddTransaction from './pages/add-transaction';
import PortfolioHoldings from './pages/portfolio-holdings';
import MarketOverview from './pages/market-overview';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AddTransaction />} />
        <Route path="/coin-detail" element={<CoinDetail />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/portfolio-holdings" element={<PortfolioHoldings />} />
        <Route path="/market-overview" element={<MarketOverview />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
