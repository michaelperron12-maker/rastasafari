'use client';

interface PriceSummaryProps {
  adults: number;
  children: number;
  pricePerPerson: number;
  childPrice: number;
  pickupSupplement: number;
  pickupLocation: string;
}

export default function PriceSummary({
  adults,
  children,
  pricePerPerson,
  childPrice,
  pickupSupplement,
  pickupLocation,
}: PriceSummaryProps) {
  const adultsTotal = adults * pricePerPerson;
  const childrenTotal = children * childPrice;
  const subtotal = adultsTotal + childrenTotal;
  const total = subtotal + pickupSupplement;

  return (
    <div className="bg-gradient-to-br from-green-900/40 to-amber-900/40 rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Résumé du prix
      </h3>

      <div className="space-y-3 text-sm">
        {/* Adults */}
        {adults > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-300">
              {adults} Adulte{adults > 1 ? 's' : ''} × ${pricePerPerson}
            </span>
            <span className="font-semibold">${adultsTotal}</span>
          </div>
        )}

        {/* Children */}
        {children > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-300">
              {children} Enfant{children > 1 ? 's' : ''} (4-12 ans) × ${childPrice}
            </span>
            <span className="font-semibold">${childrenTotal}</span>
          </div>
        )}

        {/* Pickup Supplement */}
        {pickupSupplement > 0 && (
          <div className="flex justify-between items-center text-orange-400">
            <span>
              Supplément ramassage ({pickupLocation})
            </span>
            <span className="font-semibold">+${pickupSupplement}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-white/10 my-4" />

        {/* Total */}
        <div className="flex justify-between items-center text-lg">
          <span className="font-bold">Total</span>
          <span className="text-2xl font-bold text-amber-500">${total} USD</span>
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-4 p-3 bg-white/5 rounded-lg text-xs text-gray-400">
        <p className="flex items-start gap-2">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>
            Transport inclus depuis Montego Bay, Negril et Grand Palladium
          </span>
        </p>
        <p className="flex items-start gap-2 mt-2">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>
            Déjeuner jamaïcain authentique inclus
          </span>
        </p>
      </div>
    </div>
  );
}
