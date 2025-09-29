import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CryptocurrencySelector = ({ selectedCrypto, onCryptoChange, onPriceUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const cryptocurrencies = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 43250.00,
      change: '+2.5%',
      icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      popular: true
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2680.00,
      change: '-1.2%',
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      popular: true
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.52,
      change: '+5.8%',
      icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
      popular: true
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      price: 98.45,
      change: '+3.2%',
      icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      popular: true
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      price: 7.23,
      change: '-0.8%',
      icon: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
      popular: false
    },
    {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'LINK',
      price: 14.67,
      change: '+1.9%',
      icon: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
      popular: false
    },
    {
      id: 'litecoin',
      name: 'Litecoin',
      symbol: 'LTC',
      price: 73.21,
      change: '+0.5%',
      icon: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
      popular: false
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      price: 0.89,
      change: '+4.1%',
      icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      popular: false
    }
  ];

  useEffect(() => {
    const filtered = cryptocurrencies?.filter(crypto =>
      crypto?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      crypto?.symbol?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCryptoSelect = (crypto) => {
    onCryptoChange(crypto);
    onPriceUpdate(crypto?.price);
    setIsOpen(false);
    setSearchQuery('');
  };

  const popularCryptos = cryptocurrencies?.filter(crypto => crypto?.popular);
  const otherCryptos = filteredCryptos?.filter(crypto => !crypto?.popular);

  return (
    <div className="space-y-3" ref={dropdownRef}>
      <label className="block text-sm font-medium text-foreground">
        Cryptocurrency <span className="text-error">*</span>
      </label>
      {/* Selected Crypto Display / Search Input */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setTimeout(() => inputRef?.current?.focus(), 100);
            }
          }}
          className="w-full flex items-center justify-between p-3 bg-input border border-border rounded-lg hover:border-ring focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
        >
          {selectedCrypto ? (
            <div className="flex items-center space-x-3">
              <Image
                src={selectedCrypto?.icon}
                alt={selectedCrypto?.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-left">
                <div className="font-medium text-foreground">{selectedCrypto?.name}</div>
                <div className="text-sm text-muted-foreground">{selectedCrypto?.symbol}</div>
              </div>
              <div className="ml-auto text-right">
                <div className="font-mono text-sm text-foreground">
                  ${selectedCrypto?.price?.toLocaleString()}
                </div>
                <div className={`text-xs ${
                  selectedCrypto?.change?.startsWith('+') ? 'text-success' : 'text-error'
                }`}>
                  {selectedCrypto?.change}
                </div>
              </div>
            </div>
          ) : (
            <span className="text-muted-foreground">Select cryptocurrency</span>
          )}
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground ml-2" 
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevation-2 z-50 max-h-80 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search cryptocurrencies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {/* Popular Cryptocurrencies */}
              {!searchQuery && (
                <div className="p-2">
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Popular
                  </div>
                  {popularCryptos?.map((crypto) => (
                    <button
                      key={crypto?.id}
                      type="button"
                      onClick={() => handleCryptoSelect(crypto)}
                      className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-smooth"
                    >
                      <Image
                        src={crypto?.icon}
                        alt={crypto?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-foreground">{crypto?.name}</div>
                        <div className="text-sm text-muted-foreground">{crypto?.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm text-foreground">
                          ${crypto?.price?.toLocaleString()}
                        </div>
                        <div className={`text-xs ${
                          crypto?.change?.startsWith('+') ? 'text-success' : 'text-error'
                        }`}>
                          {crypto?.change}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* All/Filtered Cryptocurrencies */}
              {(searchQuery || otherCryptos?.length > 0) && (
                <div className="p-2">
                  {searchQuery && (
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Search Results
                    </div>
                  )}
                  {!searchQuery && otherCryptos?.length > 0 && (
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Other Cryptocurrencies
                    </div>
                  )}
                  {(searchQuery ? filteredCryptos : otherCryptos)?.map((crypto) => (
                    <button
                      key={crypto?.id}
                      type="button"
                      onClick={() => handleCryptoSelect(crypto)}
                      className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-smooth"
                    >
                      <Image
                        src={crypto?.icon}
                        alt={crypto?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-foreground">{crypto?.name}</div>
                        <div className="text-sm text-muted-foreground">{crypto?.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm text-foreground">
                          ${crypto?.price?.toLocaleString()}
                        </div>
                        <div className={`text-xs ${
                          crypto?.change?.startsWith('+') ? 'text-success' : 'text-error'
                        }`}>
                          {crypto?.change}
                        </div>
                      </div>
                    </button>
                  ))}
                  {searchQuery && filteredCryptos?.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">
                      <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No cryptocurrencies found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptocurrencySelector;