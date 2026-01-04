import { MessageSquare, Phone, Users, Mail } from "lucide-react";

export function Timeline({ activities }: { activities: any[] }) {
  const icons: any = { Note: <MessageSquare size={14}/>, Call: <Phone size={14}/>, Meeting: <Users size={14}/>, Email: <Mail size={14}/> };

  return (
    <div className="space-y-6 border-l-2 border-slate-100 ml-4">
      {activities.map((act) => (
        <div key={act._id} className="relative pl-8">
          <div className="absolute -left-[11px] bg-white border-2 border-slate-200 p-1 rounded-full text-slate-400">
            {icons[act.type]}
          </div>
          <div className="bg-white p-3 rounded-lg border shadow-sm">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span className="font-bold text-slate-700">{act.type}</span>
              <span>{new Date(act.timestamp).toLocaleString()}</span>
            </div>
            <p className="text-sm text-slate-600">{act.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}