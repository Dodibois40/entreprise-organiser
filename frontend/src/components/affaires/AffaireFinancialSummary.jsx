import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  IconTarget,
  IconTrendingUp,
  IconCurrencyEuro,
  IconShoppingCart,
  IconBuildingFactory,
  IconCalculator,
  IconClock,
  IconChartPie,
  IconActivity,
  IconArrowUpRight,
  IconArrowDownRight
} from '@tabler/icons-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AffaireFinancialSummary = ({ affaire, financialData }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatPercentage = (value) => {
    return `${(value || 0).toFixed(1)}%`;
  };

  const formatHours = (hours) => {
    return `${(hours || 0).toFixed(1)}h`;
  };

  // Couleurs modernes inspirées Material Design
  const COLORS = {
    primary: '#6366f1', // Indigo
    secondary: '#ec4899', // Pink
    success: '#10b981', // Emerald
    warning: '#f59e0b', // Amber
    danger: '#ef4444', // Red
    info: '#06b6d4', // Cyan
    achats: '#f97316', // Orange
    mainOeuvre: '#3b82f6', // Blue
    fraisGeneraux: '#8b5cf6', // Violet
    marge: '#10b981' // Emerald
  };

  // Données pour le graphique de comparaison Prévisions vs Réalisé
  const comparisonData = [
    {
      name: 'CA',
      prevu: financialData.objectifCA || 0,
      realise: financialData.caReel || 0,
      color: COLORS.primary
    },
    {
      name: 'Achats',
      prevu: financialData.objectifAchats || 0,
      realise: financialData.achatReel || 0,
      color: COLORS.achats
    },
    {
      name: 'Main-d\'œuvre',
      prevu: financialData.coutObjectifMainOeuvre || 0,
      realise: financialData.totalMainOeuvreReelle || 0,
      color: COLORS.mainOeuvre
    },
    {
      name: 'Marge',
      prevu: financialData.margeObjectif || 0,
      realise: financialData.margeReelle || 0,
      color: COLORS.marge
    }
  ];

  // Données pour le camembert Répartition Prévue
  const repartitionPrevueData = [
    {
      name: 'Achats',
      value: financialData.objectifAchats || 0,
      color: COLORS.achats,
      percentage: financialData.objectifCA > 0 ? ((financialData.objectifAchats || 0) / financialData.objectifCA * 100) : 0
    },
    {
      name: 'Main-d\'œuvre',
      value: financialData.coutObjectifMainOeuvre || 0,
      color: COLORS.mainOeuvre,
      percentage: financialData.objectifCA > 0 ? ((financialData.coutObjectifMainOeuvre || 0) / financialData.objectifCA * 100) : 0
    },
    {
      name: 'Frais généraux',
      value: financialData.fraisGenerauxObjectifs || 0,
      color: COLORS.fraisGeneraux,
      percentage: financialData.objectifCA > 0 ? ((financialData.fraisGenerauxObjectifs || 0) / financialData.objectifCA * 100) : 0
    },
    {
      name: 'Marge',
      value: financialData.margeObjectif || 0,
      color: COLORS.marge,
      percentage: financialData.objectifCA > 0 ? ((financialData.margeObjectif || 0) / financialData.objectifCA * 100) : 0
    }
  ].filter(item => item.value > 0);

  // Données pour le camembert Répartition Réelle - MODIFIÉ pour exclure les marges négatives du camembert
  const repartitionReelleData = (() => {
    const margeReelle = financialData.margeReelle || 0;
    const caReel = financialData.caReel || 0;
    
    // Construire les données de base (toujours dans le camembert)
    const baseData = [
      {
        name: 'Achats',
        value: financialData.achatReel || 0,
        color: COLORS.achats,
        percentage: caReel > 0 ? ((financialData.achatReel || 0) / caReel * 100) : 0
      },
      {
        name: 'Main-d\'œuvre',
        value: financialData.totalMainOeuvreReelle || 0,
        color: COLORS.mainOeuvre,
        percentage: caReel > 0 ? ((financialData.totalMainOeuvreReelle || 0) / caReel * 100) : 0
      },
      {
        name: 'Frais généraux',
        value: financialData.fraisGenerauxReels || 0,
        color: COLORS.fraisGeneraux,
        percentage: caReel > 0 ? ((financialData.fraisGenerauxReels || 0) / caReel * 100) : 0
      }
    ].filter(item => item.value > 0);

    // Ajouter la marge SEULEMENT si elle est positive
    if (margeReelle > 0) {
      baseData.push({
        name: 'Marge',
        value: margeReelle,
        color: COLORS.marge,
        percentage: caReel > 0 ? (margeReelle / caReel * 100) : 0
      });
    }

    return baseData;
  })();

  // Calculer si on a une marge négative pour l'affichage séparé
  const margeNegative = (financialData.margeReelle || 0) < 0 ? Math.abs(financialData.margeReelle) : 0;
  const pourcentageMargeNegative = financialData.caReel > 0 ? ((financialData.margeReelle || 0) / financialData.caReel * 100) : 0;

  // Tooltip personnalisé moderne
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-4 min-w-[200px]">
          <p className="font-semibold text-gray-900 mb-2">{data.name}</p>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Valeur:</span>
              <span className="font-bold text-gray-900">
                {formatCurrency(data.value)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pourcentage:</span>
              <span className="font-semibold text-blue-600">
                {formatPercentage(data.percentage)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom label pour les pourcentages sur les graphiques
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.03) return null; // Ne pas afficher les labels pour les petites tranches
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        className="font-bold text-sm drop-shadow-lg"
        style={{ 
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          fontSize: '16px'
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-4">
      {/* Section des camemberts côte à côte - maintenant en premier */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Camembert Répartition Prévue */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <div className="p-2 bg-blue-600 rounded-lg">
                <IconTarget className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg">Répartition Prévue</span>
                <div className="text-sm font-normal text-blue-700">
                  CA Objectif: {formatCurrency(financialData.objectifCA)}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={repartitionPrevueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={120}
                    innerRadius={0}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {repartitionPrevueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Camembert Répartition Réelle */}
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-emerald-900">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <IconTrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg">Répartition Réelle</span>
                <div className="text-sm font-normal text-emerald-700">
                  CA Réalisé: {formatCurrency(financialData.caReel)}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Alerte pour marge négative */}
            {margeNegative > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
                  <div className="text-red-800 text-sm font-medium">
                    ⚠️ Marge négative: {formatCurrency(-margeNegative)} ({formatPercentage(pourcentageMargeNegative)})
                  </div>
                </div>
                <div className="text-xs text-red-600 mt-1 ml-6">
                  Les coûts dépassent le chiffre d'affaires réalisé
                </div>
              </div>
            )}
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={repartitionReelleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={120}
                    innerRadius={0}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {repartitionReelleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Note explicative pour marge négative */}
            {margeNegative > 0 && (
              <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                💡 Le camembert montre la répartition des coûts. La marge négative est affichée séparément car elle représente un déficit.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Section de comparaison Prévisions vs Réalisé - maintenant en second */}
      <Card className="bg-gradient-to-br from-white to-gray-50 shadow-xl border-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
              <IconActivity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg">Vue d'ensemble Financière</span>
              <div className="text-sm font-normal text-gray-600">
                Comparaison objectifs vs réalisations
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatCurrency}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), '']}
                  labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="prevu" fill={COLORS.primary} name="Prévu" radius={[2, 2, 0, 0]} />
                <Bar dataKey="realise" fill={COLORS.success} name="Réalisé" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Section détaillée des heures (si applicable) */}
      {financialData.nbPhases > 0 && (
        <Card className="bg-gradient-to-br from-slate-50 to-gray-100 shadow-xl border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-gray-800">
              <div className="p-2 bg-gradient-to-br from-gray-600 to-slate-700 rounded-lg shadow-lg">
                <IconCalculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg">Détail Main-d'œuvre</span>
                <div className="text-sm font-normal text-gray-600">
                  Répartition par type d'activité
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fabrication */}
              {(financialData.objectifHeuresFab || 0) > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconBuildingFactory className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-semibold text-gray-800">Fabrication</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Prévu:</span>
                      <span className="font-semibold">{formatHours(financialData.objectifHeuresFab)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Coût:</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(financialData.coutObjectifHeuresFab)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Service */}
              {(financialData.objectifHeuresSer || 0) > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <IconClock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="font-semibold text-gray-800">Service</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Prévu:</span>
                      <span className="font-semibold">{formatHours(financialData.objectifHeuresSer)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Coût:</span>
                      <span className="font-semibold text-emerald-600">{formatCurrency(financialData.coutObjectifHeuresSer)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pose */}
              {(financialData.objectifHeuresPose || 0) > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <IconShoppingCart className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="font-semibold text-gray-800">Pose</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Prévu:</span>
                      <span className="font-semibold">{formatHours(financialData.objectifHeuresPose)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Coût:</span>
                      <span className="font-semibold text-amber-600">{formatCurrency(financialData.coutObjectifHeuresPose)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AffaireFinancialSummary; 