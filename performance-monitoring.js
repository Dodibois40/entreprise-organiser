/**
 * Système de monitoring des performances pour Entreprise Organiser
 * Collecte et analyse les métriques de performance côté client et serveur
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isEnabled = process.env.NODE_ENV === 'production';
    
    if (this.isEnabled) {
      this.initializeObservers();
      this.startPerformanceTracking();
    }
  }

  /**
   * Initialise les observateurs de performance
   */
  initializeObservers() {
    // Observer pour les Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      this.observeMetric('largest-contentful-paint', (entries) => {
        const lcpEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lcpEntry.startTime);
      });

      // First Input Delay (FID)
      this.observeMetric('first-input', (entries) => {
        const fidEntry = entries[0];
        this.recordMetric('FID', fidEntry.processingStart - fidEntry.startTime);
      });

      // Cumulative Layout Shift (CLS)
      this.observeMetric('layout-shift', (entries) => {
        let clsValue = 0;
        for (const entry of entries) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.recordMetric('CLS', clsValue);
      });

      // Time to First Byte (TTFB)
      this.observeMetric('navigation', (entries) => {
        const navEntry = entries[0];
        this.recordMetric('TTFB', navEntry.responseStart - navEntry.fetchStart);
      });
    }
  }

  /**
   * Observe une métrique spécifique
   */
  observeMetric(type, callback) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      
      observer.observe({ type, buffered: true });
      this.observers.set(type, observer);
    } catch (error) {
      console.warn(`Impossible d'observer la métrique ${type}:`, error);
    }
  }

  /**
   * Démarre le tracking des performances
   */
  startPerformanceTracking() {
    // Mesurer le temps de chargement initial
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.recordMetric('PageLoadTime', loadTime);
      
      // Envoyer les métriques après le chargement
      setTimeout(() => this.sendMetrics(), 1000);
    });

    // Mesurer les interactions utilisateur
    this.trackUserInteractions();
    
    // Mesurer les erreurs JavaScript
    this.trackJavaScriptErrors();
    
    // Mesurer l'utilisation de la mémoire
    this.trackMemoryUsage();
  }

  /**
   * Track les interactions utilisateur
   */
  trackUserInteractions() {
    const interactionTypes = ['click', 'keydown', 'scroll'];
    
    interactionTypes.forEach(type => {
      document.addEventListener(type, (event) => {
        const startTime = performance.now();
        
        // Mesurer le temps de réponse
        requestAnimationFrame(() => {
          const responseTime = performance.now() - startTime;
          this.recordMetric(`${type}ResponseTime`, responseTime);
        });
      }, { passive: true });
    });
  }

  /**
   * Track les erreurs JavaScript
   */
  trackJavaScriptErrors() {
    window.addEventListener('error', (event) => {
      this.recordError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now()
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.recordError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        timestamp: Date.now()
      });
    });
  }

  /**
   * Track l'utilisation de la mémoire
   */
  trackMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        this.recordMetric('MemoryUsed', memory.usedJSHeapSize);
        this.recordMetric('MemoryTotal', memory.totalJSHeapSize);
        this.recordMetric('MemoryLimit', memory.jsHeapSizeLimit);
      }, 30000); // Toutes les 30 secondes
    }
  }

  /**
   * Enregistre une métrique
   */
  recordMetric(name, value, tags = {}) {
    const metric = {
      name,
      value,
      timestamp: Date.now(),
      url: window.location.pathname,
      userAgent: navigator.userAgent,
      ...tags
    };

    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    this.metrics.get(name).push(metric);
    
    // Limiter le nombre de métriques stockées
    if (this.metrics.get(name).length > 100) {
      this.metrics.get(name).shift();
    }
  }

  /**
   * Enregistre une erreur
   */
  recordError(error) {
    this.recordMetric('JavaScriptError', 1, error);
  }

  /**
   * Mesure le temps d'exécution d'une fonction
   */
  measureFunction(name, fn) {
    return (...args) => {
      const startTime = performance.now();
      const result = fn.apply(this, args);
      
      if (result instanceof Promise) {
        return result.finally(() => {
          const endTime = performance.now();
          this.recordMetric(`Function_${name}`, endTime - startTime);
        });
      } else {
        const endTime = performance.now();
        this.recordMetric(`Function_${name}`, endTime - startTime);
        return result;
      }
    };
  }

  /**
   * Mesure le temps d'une requête API
   */
  measureApiCall(url, method = 'GET') {
    const startTime = performance.now();
    
    return {
      start: startTime,
      end: () => {
        const endTime = performance.now();
        this.recordMetric('ApiCallDuration', endTime - startTime, {
          url,
          method
        });
      }
    };
  }

  /**
   * Envoie les métriques au serveur
   */
  async sendMetrics() {
    if (!this.isEnabled || this.metrics.size === 0) {
      return;
    }

    try {
      const metricsData = {};
      this.metrics.forEach((values, name) => {
        metricsData[name] = values;
      });

      // Utiliser sendBeacon pour un envoi fiable
      if ('sendBeacon' in navigator) {
        const blob = new Blob([JSON.stringify(metricsData)], {
          type: 'application/json'
        });
        navigator.sendBeacon('/api/metrics', blob);
      } else {
        // Fallback pour les navigateurs plus anciens
        await fetch('/api/metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(metricsData)
        });
      }

      // Nettoyer les métriques après envoi
      this.metrics.clear();
    } catch (error) {
      console.warn('Erreur lors de l\'envoi des métriques:', error);
    }
  }

  /**
   * Obtient un résumé des performances
   */
  getPerformanceSummary() {
    const summary = {};
    
    this.metrics.forEach((values, name) => {
      if (values.length > 0) {
        const numericValues = values.map(v => v.value).filter(v => typeof v === 'number');
        
        if (numericValues.length > 0) {
          summary[name] = {
            count: numericValues.length,
            avg: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
            min: Math.min(...numericValues),
            max: Math.max(...numericValues),
            latest: numericValues[numericValues.length - 1]
          };
        }
      }
    });
    
    return summary;
  }

  /**
   * Nettoie les observateurs
   */
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.metrics.clear();
  }
}

// Instance globale du monitor
const performanceMonitor = new PerformanceMonitor();

// Envoyer les métriques avant la fermeture de la page
window.addEventListener('beforeunload', () => {
  performanceMonitor.sendMetrics();
});

// Envoyer les métriques périodiquement
setInterval(() => {
  performanceMonitor.sendMetrics();
}, 60000); // Toutes les minutes

// Export pour utilisation dans l'application
export default performanceMonitor; 