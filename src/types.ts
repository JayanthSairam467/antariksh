export type PageId = 'home' | 'problem' | 'solution' | 'tech' | 'benchmarks' | 'team' | 'simulator';

export interface BenchmarkData {
  efficiency: {
    ramUsageKb: number;
    ramBudgetKb: number;
    flashUsageKb: number;
    flashTotalKb: number;
    idleCpuPercent: number;
    idleCpuBudgetPercent: number;
    activeInferenceCpuPercent: number;
  };
  accuracy: {
    truePositiveRate: number; // e.g. 96.8%
    falseActivationRatePerHour: number; // e.g. 0.12 / hr
    cleanSpeechAccuracy: number; // 98.4%
    noisySpeech10dbAccuracy: number; // 92.6%
    confusionRejectRate: number; // 99.2% for non-target Hindi/English words
  };
  latency: {
    totalWakeToStreamMs: number; // e.g. 68ms
    targetBudgetMs: number; // 150ms
    dmaSampleMs: number;
    mfccFeatureExtractionMs: number;
    tfliteInferenceMs: number;
    decisionGateMs: number;
    wifiPacketDispatchMs: number;
    asrFirstPacketReceiptMs: number;
  };
}

export interface OptimizationComparisonItem {
  metric: string;
  baselineCloudOnly: number | string;
  unoptimizedEdge: number | string;
  antarikshOptimized: number | string;
  unit: string;
  improvement: string;
}

export interface TechStackItem {
  id: string;
  category: 'Hardware' | 'On-Device ML' | 'Model Architecture' | 'Networking' | 'Cloud ASR' | 'Toolchain';
  name: string;
  version: string;
  license: string;
  role: string;
  description: string;
  specs: string[];
  icon: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialization: string;
  contributions: string[];
  avatarFallback: string;
  socials?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface ArchitectureStep {
  id: number;
  phase: string;
  title: string;
  location: 'Edge (ESP32)' | 'Network (WiFi)' | 'Cloud/Server (ASR)';
  hardwareOrSoftware: string;
  latency: string;
  description: string;
  subDetails: string[];
  statusColor: 'cyan' | 'amber' | 'emerald' | 'blue';
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'TRIGGER' | 'STREAM' | 'SUCCESS' | 'WARN';
  message: string;
  subsystem: 'I2S_DMA' | 'TFLITE_KWS' | 'WIFI_STREAM' | 'ASR_VOSK';
}
