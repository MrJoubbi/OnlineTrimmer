import React from 'react';
import { Check, X, Shield, Zap, Sparkles, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface CompetitorComparisonProps {
  toolType?: 'video' | 'audio' | 'pdf' | 'all';
}

export const CompetitorComparison: React.FC<CompetitorComparisonProps> = ({ toolType = 'all' }) => {
  const { t } = useLanguage();

  const comparisonData = [
    {
      feature: t('compUploadReq'),
      onlinetrimmer: { value: t('compUploadNo'), highlight: true, positive: true },
      onlineVideoCutter: { value: t('compUploadYes'), positive: false },
      audioTrimmer: { value: t('compUploadYes'), positive: false },
      clideoKapwing: { value: t('compUploadYes'), positive: false },
    },
    {
      feature: t('compPrivacy'),
      onlinetrimmer: { value: t('compPrivacyZero'), highlight: true, positive: true },
      onlineVideoCutter: { value: t('compPrivacyStored'), positive: false },
      audioTrimmer: { value: t('compPrivacyStored'), positive: false },
      clideoKapwing: { value: t('compPrivacyStored'), positive: false },
    },
    {
      feature: t('compWatermark'),
      onlinetrimmer: { value: t('compWatermarkNone'), highlight: true, positive: true },
      onlineVideoCutter: { value: t('compWatermarkNone'), positive: true },
      audioTrimmer: { value: t('compWatermarkNone'), positive: true },
      clideoKapwing: { value: t('compWatermarkHuge'), positive: false },
    },
    {
      feature: t('compSpeed'),
      onlinetrimmer: { value: t('compSpeedInstant'), highlight: true, positive: true },
      onlineVideoCutter: { value: t('compSpeedSlow'), positive: false },
      audioTrimmer: { value: t('compSpeedSlow'), positive: false },
      clideoKapwing: { value: t('compSpeedSlow'), positive: false },
    },
    {
      feature: t('compQuality'),
      onlinetrimmer: { value: t('compQualityLossless'), highlight: true, positive: true },
      onlineVideoCutter: { value: t('compQualityLossless'), positive: true },
      audioTrimmer: { value: t('compQualityLossless'), positive: true },
      clideoKapwing: { value: t('compQualityLossy'), positive: false },
    },
    {
      feature: t('compSize'),
      onlinetrimmer: { value: t('compSizeNoLimit'), highlight: true, positive: true },
      onlineVideoCutter: { value: t('compSizeLimit500'), positive: false },
      audioTrimmer: { value: t('compSizeLimit500'), positive: false },
      clideoKapwing: { value: t('compSizeLimit500'), positive: false },
    },
    {
      feature: t('compCost'),
      onlinetrimmer: { value: t('compCostFree'), highlight: true, positive: true },
      onlineVideoCutter: { value: t('compCostFree'), positive: true },
      audioTrimmer: { value: t('compCostFree'), positive: true },
      clideoKapwing: { value: t('compCostSub'), positive: false },
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-16">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('comparisonBadge')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t('comparisonTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
          {t('comparisonSubtitle')}
        </p>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b-2 border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4 font-bold text-slate-700 w-1/4">{t('featureCol')}</th>
              <th className="py-3.5 px-4 font-bold text-emerald-700 bg-emerald-50/80 rounded-t-xl w-1/4">
                <div className="flex items-center space-x-1.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>{t('onlineTrimmerCol')}</span>
                </div>
              </th>
              <th className="py-3.5 px-4 font-semibold text-slate-600 w-1/6">{t('competitorVideoCol')}</th>
              <th className="py-3.5 px-4 font-semibold text-slate-600 w-1/6">{t('competitorAudioCol')}</th>
              <th className="py-3.5 px-4 font-semibold text-slate-600 w-1/6">{t('competitorCloudCol')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {comparisonData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 font-medium text-slate-800">
                  <div className="flex items-center space-x-1.5">
                    <span>{row.feature}</span>
                    <HelpCircle className="w-3 h-3 text-slate-400 shrink-0 cursor-help" />
                  </div>
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-900 bg-emerald-50/50">
                  <div className="flex items-center space-x-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{row.onlinetrimmer.value}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-600">
                  <div className="flex items-center space-x-1.5">
                    {row.onlineVideoCutter.positive ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span>{row.onlineVideoCutter.value}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-600">
                  <div className="flex items-center space-x-1.5">
                    {row.audioTrimmer.positive ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span>{row.audioTrimmer.value}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-600">
                  <div className="flex items-center space-x-1.5">
                    {row.clideoKapwing.positive ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    )}
                    <span>{row.clideoKapwing.value}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Verified on Chrome, Safari, Edge, and Firefox</span>
        </div>
        <div className="text-emerald-700 font-semibold">
          100% In-Browser & Zero Registration
        </div>
      </div>
    </div>
  );
};
