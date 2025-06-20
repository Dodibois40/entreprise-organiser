import React from 'react';
import {
  IconCurrencyEuro,
  IconShoppingCart,
  IconClock,
  IconTrendingUp,
  IconTrendingDown,
  IconTarget,
  IconAlertTriangle,
  IconCalculator,
  IconPercentage,
  IconProgress,
  IconCheck,
  IconAlertCircle,
  IconActivity,
  IconChartBar,
  IconCalendar,
  IconUser,
  IconMapPin
} from '@tabler/icons-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AffaireDashboard = ({ affaire, financialData, marginAlerts }) => {
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

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('fr-FR');
  };

  // Calcul des pourcentages de progression
  const caPercentage = financialData.objectifCA > 0 ? (financialData.caReel / financialData.objectifCA) * 100 : 0;
  const achatsPercentage = financialData.objectifAchats > 0 ? (financialData.achatReel / financialData.objectifAchats) * 100 : 0;
  const heuresPercentage = financialData.objectifHeures > 0 ? (financialData.heuresReelles / financialData.objectifHeures) * 100 : 0;

  // Fonction pour déterminer la couleur du statut
  const getStatusColor = (percentage, isReverse = false) => {
    if (isReverse) {
      if (percentage <= 85) return 'success';
      if (percentage <= 100) return 'warning';
      return 'danger';
    } else {
      if (percentage >= 95) return 'success';
      if (percentage >= 75) return 'warning';
      return 'danger';
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'success':
        return {
          color: 'emerald',
          bgClass: 'bg-gradient-to-br from-emerald-500 to-green-600',
          lightBg: 'bg-emerald-50',
          textColor: 'text-emerald-900',
          icon: IconCheck
        };
      case 'warning':
        return {
          color: 'amber',
          bgClass: 'bg-gradient-to-br from-amber-500 to-orange-600',
          lightBg: 'bg-amber-50',
          textColor: 'text-amber-900',
          icon: IconAlertCircle
        };
      case 'danger':
        return {
          color: 'rose',
          bgClass: 'bg-gradient-to-br from-rose-500 to-red-600',
          lightBg: 'bg-rose-50',
          textColor: 'text-rose-900',
          icon: IconAlertTriangle
        };
      default:
        return {
          color: 'slate',
          bgClass: 'bg-gradient-to-br from-slate-500 to-gray-600',
          lightBg: 'bg-slate-50',
          textColor: 'text-slate-900',
          icon: IconActivity
        };
    }
  };

  // Configuration des métriques principales
  const metrics = [
    {
      id: 'ca',
      title: 'Chiffre d\'Affaires',
      icon: IconCurrencyEuro,
      value: financialData.caReel,
      target: financialData.objectifCA,
      percentage: caPercentage,
      status: getStatusColor(caPercentage, false),
      prefix: '',
      suffix: ' €'
    },
    {
      id: 'achats',
      title: 'Achats',
      icon: IconShoppingCart,
      value: financialData.achatReel,
      target: financialData.objectifAchats,
      percentage: achatsPercentage,
      status: getStatusColor(achatsPercentage, true),
      prefix: '',
      suffix: ' €'
    },
    {
      id: 'heures',
      title: 'Heures Travaillées',
      icon: IconClock,
      value: financialData.heuresReelles,
      target: financialData.objectifHeures,
      percentage: heuresPercentage,
      status: getStatusColor(heuresPercentage, true),
      prefix: '',
      suffix: 'h'
    },
    {
      id: 'marge',
      title: 'Marge Réalisée',
      icon: IconTrendingUp,
      value: financialData.margeReelle,
      target: financialData.margeObjectif,
      percentage: financialData.pourcentageMargeReelle,
      percentageTarget: financialData.pourcentageMargeObjectif,
      status: financialData.pourcentageMargeReelle >= financialData.pourcentageMargeObjectif ? 'success' : 'danger',
      prefix: '',
      suffix: ' €'
    }
  ];

  // Calculer le statut de la marge
  const margeStatus = financialData.pourcentageMargeReelle >= 18 ? 'success' : 
                     financialData.pourcentageMargeReelle >= 15 ? 'warning' : 'danger';
  const margeStatusInfo = getStatusInfo(margeStatus);

  return (
    <div className="space-y-6">
      {/* Alertes de marge critiques */}
      {(marginAlerts.alerteMargeReelle || marginAlerts.alerteMargeObjectif) && (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-full">
              <IconAlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Alerte Marge Critique</h3>
              <p className="text-red-700 mb-3">
                Le coefficient de marge est inférieur au seuil critique de 1.6
              </p>
              {marginAlerts.alerteMargeReelle && (
                <div className="bg-red-100 rounded-lg p-3 text-sm">
                  <strong>Marge réelle :</strong> {marginAlerts.coefficientMargeReel.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NOUVEAU: Carte Marge Réalisée mise en avant - Design épuré */}
      <Card className="bg-white border-2 border-indigo-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <IconTrendingUp className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Marge Réalisée</h2>
                <p className="text-gray-600 text-sm">Indicateur clé de performance</p>
              </div>
            </div>
            <div className={`p-2 rounded-lg ${margeStatusInfo.lightBg}`}>
              {React.createElement(margeStatusInfo.icon, { className: `w-6 h-6 ${margeStatusInfo.textColor}` })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Montant */}
            <div className="text-center bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {formatCurrency(financialData.margeReelle)}
              </div>
              <div className="text-gray-600 text-sm font-medium">Montant Réalisé</div>
            </div>

            {/* Pourcentage */}
            <div className="text-center bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {formatPercentage(financialData.pourcentageMargeReelle)}
              </div>
              <div className="text-gray-600 text-sm font-medium">Taux de Marge</div>
              <div className="text-xs text-gray-500 mt-1">
                Objectif: {formatPercentage(financialData.pourcentageMargeObjectif)}
              </div>
            </div>

            {/* Écart avec objectif */}
            <div className="text-center bg-gray-50 rounded-lg p-4">
              <div className={`text-3xl font-bold mb-2 ${
                (financialData.margeReelle || 0) >= (financialData.margeObjectif || 0) 
                  ? 'text-emerald-600' 
                  : 'text-red-600'
              }`}>
                {formatCurrency((financialData.margeReelle || 0) - (financialData.margeObjectif || 0))}
              </div>
              <div className="text-gray-600 text-sm font-medium">Écart Objectif</div>
              <div className="text-xs text-gray-500 mt-1">
                Prévu: {formatCurrency(financialData.margeObjectif)}
              </div>
            </div>
          </div>

          {/* Barre de progression de la marge - simplifiée */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Performance vs Objectif</span>
              <span className="text-sm font-semibold text-indigo-600">
                {financialData.margeObjectif > 0 ? 
                  formatPercentage((financialData.margeReelle / financialData.margeObjectif) * 100) 
                  : '0%'
                }
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                  (financialData.margeReelle || 0) >= (financialData.margeObjectif || 0) 
                    ? 'bg-emerald-500' 
                    : 'bg-indigo-500'
                }`}
                style={{ 
                  width: `${Math.min(
                    financialData.margeObjectif > 0 ? 
                      (financialData.margeReelle / financialData.margeObjectif) * 100 
                      : 0, 
                    100
                  )}%` 
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cartes des métriques secondaires - Design épuré */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.filter(m => m.id !== 'marge').map((metric) => {
          const statusInfo = getStatusInfo(metric.status);
          const Icon = metric.icon;
          const StatusIcon = statusInfo.icon;

          return (
            <Card key={metric.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5">
                {/* Header avec icône et statut */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${statusInfo.lightBg}`}>
                    <Icon className={`w-5 h-5 ${statusInfo.textColor}`} />
                  </div>
                  <StatusIcon className={`w-4 h-4 ${statusInfo.textColor}`} />
                </div>

                {/* Titre */}
                <h3 className="font-semibold text-gray-900 text-sm mb-3">{metric.title}</h3>

                {/* Valeurs principales */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      {metric.suffix === 'h' ? formatHours(metric.value) : formatCurrency(metric.value)}
                    </span>
                    <span className="text-xs text-gray-500">
                      / {metric.suffix === 'h' ? formatHours(metric.target) : formatCurrency(metric.target)}
                    </span>
                  </div>

                  {/* Barre de progression simplifiée */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ease-out ${
                        metric.status === 'success' ? 'bg-emerald-500' : 
                        metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                    />
                  </div>

                  {/* Pourcentage */}
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${statusInfo.textColor}`}>
                      {formatPercentage(metric.percentage)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Section phases - Design moderne */}
      {financialData.nbPhases > 0 && (
        <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-gray-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-gray-800">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <IconCalculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl">Main-d'œuvre</span>
                <div className="text-sm font-normal text-gray-600">
                  {financialData.nbPhases} phase{financialData.nbPhases > 1 ? 's' : ''} de travail
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {formatCurrency(financialData.totalMainOeuvreEstimee)}
                  </div>
                  <div className="text-sm text-gray-500">Coût Estimé</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-2">
                    {formatCurrency(financialData.totalMainOeuvreReelle)}
                  </div>
                  <div className="text-sm text-gray-500">Coût Réel</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-2 ${
                    (financialData.totalMainOeuvreReelle || 0) <= (financialData.totalMainOeuvreEstimee || 0) 
                      ? 'text-emerald-600' 
                      : 'text-rose-600'
                  }`}>
                    {formatCurrency((financialData.totalMainOeuvreReelle || 0) - (financialData.totalMainOeuvreEstimee || 0))}
                  </div>
                  <div className="text-sm text-gray-500">Écart</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AffaireDashboard; 