import React, { useState } from 'react';
import { PageId, ArchitectureStep } from '../types';
import { architectureSteps } from '../data/projectData';
import { 
  Layers, 
  Cpu, 
  Mic, 
  Wifi, 
  Server, 
  Radio, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Terminal, 
  ArrowDown, 
  ArrowRight,
  Code,
  Sparkles,
  ChevronRight,
  Play
} from 'lucide-react';
import { AudioWaveformVisualizer } from '../components/AudioWaveformVisualizer';

interface SolutionPageProps {
  onNavigate: (page: PageId) => void;
  onOpenSimulator: () => void;
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ onNavigate, onOpenSimulator }) => {
  const [selectedStepId, setSelectedStepId] = useState<number>(3); // Default to TFLite inference step
  const activeStep = architectureSteps.find((s) => s.id === selectedStepId) || architectureSteps[2];

  return (
    <div className="relative z-10 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      
      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-mono-tech shadow-xs">
          <Layers className="w-3.5 h-3.5 text-orange-600" />
          <span className="font-semibold">System Architecture & Dataflow</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight uppercase">
          Hybrid Edge-Cloud Pipeline: <br className="hidden sm:inline"/>
          <span className="text-orange-600">
            From I2S MEMS Mic to Vosk ASR in 64ms
          </span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
          How Antariksh KWS accomplishes continuous on-device keyword spotting within a <strong className="text-slate-900 font-semibold">256 KB RAM budget</strong> and under <strong className="text-slate-900 font-semibold">10% CPU usage</strong> on the ESP32, triggering a zero-copy WiFi audio stream to open-source speech recognition only when the target wake word is confirmed.
        </p>
      </div>

      {/* Synchronized Audio Waveform Banner */}
      <div className="my-10">
        <div className="text-xs font-mono-tech text-orange-700 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
          <Radio className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
          <span>Acoustic Waveform to Stream Transition Pipeline</span>
        </div>
        <AudioWaveformVisualizer interactive={true} onKeywordTrigger={onOpenSimulator} />
      </div>

      {/* STEP-BY-STEP INTERACTIVE FLOW SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-12">
        
        {/* Left Column: 6-Step Vertical Pipeline Navigator */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-mono-tech uppercase text-slate-500 font-bold tracking-wider mb-2">
            Execution Flow Sequence (Click to inspect):
          </h3>

          {architectureSteps.map((step, idx) => {
            const isSelected = selectedStepId === step.id;
            return (
              <div
                key={step.id}
                id={`arch-step-${step.id}`}
                onClick={() => setSelectedStepId(step.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-orange-50/80 border-orange-500 text-slate-900 shadow-sm ring-1 ring-orange-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono-tech font-bold text-xs ${
                      isSelected ? 'bg-orange-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                    }`}>
                      0{step.id}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono-tech uppercase text-orange-600 font-bold tracking-wider">
                        {step.location}
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 font-display">
                        {step.title}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono-tech text-emerald-700 font-bold block">
                      {step.latency}
                    </span>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isSelected ? 'rotate-90 text-orange-600' : 'text-slate-400'}`} />
                  </div>
                </div>

                {/* Vertical connector line between steps */}
                {idx < architectureSteps.length - 1 && (
                  <div className="hidden lg:block absolute left-8 -bottom-3.5 w-0.5 h-3.5 bg-slate-200" />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Technical Detail Inspector Card */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 sticky top-24 shadow-md space-y-6">
            
            {/* Step Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono-tech text-orange-600 font-bold uppercase tracking-widest block">
                  {activeStep.phase} • {activeStep.location}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1 uppercase">
                  {activeStep.title}
                </h3>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono-tech font-bold">
                Latency: {activeStep.latency}
              </div>
            </div>

            {/* Hardware / Software Subsystem Badge */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono-tech text-xs space-y-1">
              <span className="text-slate-500 uppercase text-[10px] font-medium block">Hardware & Software Subsystem:</span>
              <div className="text-slate-900 font-bold text-xs sm:text-sm">
                {activeStep.hardwareOrSoftware}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-mono-tech uppercase text-slate-500 font-bold tracking-wider mb-1.5">
                Technical Execution Overview:
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                {activeStep.description}
              </p>
            </div>

            {/* Engineering Specifications & Sub-Details */}
            <div>
              <h4 className="text-xs font-mono-tech uppercase text-slate-500 font-bold tracking-wider mb-2">
                Embedded Optimization Criteria:
              </h4>
              <div className="space-y-2">
                {activeStep.subDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet / Register Configuration Preview */}
            <div className="rounded-xl bg-slate-900 p-4 border border-slate-800 font-mono-tech text-[11px] space-y-1.5 shadow-inner">
              <div className="flex items-center justify-between text-slate-400 text-[10px] border-b border-slate-800 pb-1">
                <span className="flex items-center gap-1.5 text-orange-400 font-semibold">
                  <Code className="w-3.5 h-3.5" />
                  {activeStep.id === 1 && 'esp_i2s_dma_config.c'}
                  {activeStep.id === 2 && 'mfcc_spectrogram_quantizer.cpp'}
                  {activeStep.id === 3 && 'tflite_micro_kws_runner.cpp'}
                  {activeStep.id === 4 && 'threshold_softmax_gate.c'}
                  {activeStep.id === 5 && 'wifi_streamer_socket.c'}
                  {activeStep.id === 6 && 'vosk_asr_kaldi_stream.py'}
                </span>
                <span className="text-slate-400">ESP-IDF v5.2 / FreeRTOS</span>
              </div>

              <pre className="text-emerald-400 overflow-x-auto pt-1 leading-relaxed">
                {activeStep.id === 1 && `i2s_chan_config_t chan_cfg = I2S_CHANNEL_DEFAULT_CONFIG(I2S_NUM_0, I2S_ROLE_MASTER);
i2s_std_config_t std_cfg = {
  .clk_cfg = I2S_STD_CLK_DEFAULT_CONFIG(16000),
  .slot_cfg = I2S_STD_MSB_SLOT_DEFAULT_CONFIG(I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_MONO),
  .gpio_cfg = { .bclk = GPIO_NUM_26, .ws = GPIO_NUM_25, .dout = GPIO_NUM_22 }
};`}
                {activeStep.id === 2 && `// 40-band Mel-Frequency Cepstral Coefficients with fixed-point math
esp_dsp_fft4096_r2_window(audio_frame, hann_window, 480);
mfcc_extractor.ExtractFeatures(audio_frame, &int8_spectrogram_tensor[t]);`}
                {activeStep.id === 3 && `// TensorFlow Lite Micro Arena allocation (Static 182 KB SRAM)
tflite::MicroInterpreter interpreter(
  model, resolver, tensor_arena, kTensorArenaSize, &micro_error_reporter
);
TfLiteStatus invoke_status = interpreter.Invoke(); // 18ms on 240MHz Xtensa`}
                {activeStep.id === 4 && `float antariksh_prob = softmax_output[ANTARIKSH_INDEX];
if (antariksh_prob > 0.88f && rolling_average_check(antariksh_prob)) {
  gpio_set_level(LED_WAKE_GPIO, 1);
  trigger_audio_stream_task(); // Zero latency switch
}`}
                {activeStep.id === 5 && `// Zero-copy UDP stream packetization of post-wake command audio
int bytes_sent = sendto(sock, pre_roll_buffer, 6400, 0, (struct sockaddr*)&asr_addr, sizeof(asr_addr));
stream_live_ring_buffer_async(sock);`}
                {activeStep.id === 6 && `// Vosk Kaldi Streaming Decoder (Open Source Apache 2.0)
rec = KaldiRecognizer(model, 16000.0)
while streaming:
    if rec.AcceptWaveform(audio_chunk):
        result = json.loads(rec.Result())
        dispatch_space_command(result['text'])`}
              </pre>
            </div>

            {/* Trigger Simulator CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenSimulator}
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold font-display text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Test this Stage in Live Testbench Simulator</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Nav to Tech Stack */}
      <div className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={() => onNavigate('problem')}
          className="text-slate-500 hover:text-slate-900 text-xs font-mono-tech cursor-pointer font-semibold transition-colors"
        >
          ← Back to Problem Statement
        </button>
        <button
          onClick={() => onNavigate('tech')}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <span>Explore Technology Stack & Licenses</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
};
