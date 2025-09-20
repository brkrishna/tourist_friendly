import { ChatInterface } from '@/components/ai/chat-interface';

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AI Travel Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Get personalized recommendations, plan your itinerary, and discover the best of Hyderabad 
            with our intelligent travel assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>

          {/* Assistant Features */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">What I can help with:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-2 h-2 mt-2 flex-shrink-0"></span>
                  <span>Plan personalized itineraries based on your interests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-2 h-2 mt-2 flex-shrink-0"></span>
                  <span>Recommend restaurants matching your dietary preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-2 h-2 mt-2 flex-shrink-0"></span>
                  <span>Find verified tour guides with specialized knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-2 h-2 mt-2 flex-shrink-0"></span>
                  <span>Provide real-time crowd and weather updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-2 h-2 mt-2 flex-shrink-0"></span>
                  <span>Offer cultural context and local etiquette tips</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-2 h-2 mt-2 flex-shrink-0"></span>
                  <span>Assist with emergency situations and safety</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">Quick Tips</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <p>
                  <strong>Be specific:</strong> &quot;I want historical sites near Old City&quot; works better than just &quot;attractions&quot;
                </p>
                <p>
                  <strong>Include preferences:</strong> Mention your dietary restrictions, budget, and interests
                </p>
                <p>
                  <strong>Ask for alternatives:</strong> I can suggest backup plans if your first choice is crowded
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg border border-green-200 p-6">
              <h3 className="text-lg font-semibold mb-3 text-green-900">Sample Questions</h3>
              <div className="space-y-2 text-sm text-green-800">
                <p>&quot;Plan a 4-hour historical tour starting from Charminar&quot;</p>
                <p>&quot;Find vegetarian restaurants near Golconda Fort&quot;</p>
                <p>&quot;What&apos;s the best time to visit Salar Jung Museum?&quot;</p>
                <p>&quot;I need a guide who speaks German and knows business districts&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}