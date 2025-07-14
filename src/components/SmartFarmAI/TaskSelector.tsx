
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FarmTask } from './SmartFarmAI';
import { Camera, FileText, ImageIcon } from 'lucide-react';

interface TaskSelectorProps {
  tasks: FarmTask[];
  onTaskSelect: (task: FarmTask) => void;
  language: 'en' | 'es' | 'hi';
}

export const TaskSelector: React.FC<TaskSelectorProps> = ({ 
  tasks, 
  onTaskSelect, 
  language 
}) => {
  const getInputTypeIcon = (inputType: string) => {
    switch (inputType) {
      case 'image':
        return <Camera className="h-4 w-4" />;
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'both':
        return <ImageIcon className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getInputTypeLabel = (inputType: string) => {
    const labels = {
      en: {
        image: 'Camera/Upload',
        text: 'Text Input',
        both: 'Image & Text'
      },
      es: {
        image: 'Cámara/Subir',
        text: 'Entrada de Texto',
        both: 'Imagen y Texto'
      },
      hi: {
        image: 'कैमरा/अपलोड',
        text: 'टेक्स्ट इनपुट',
        both: 'छवि और पाठ'
      }
    };
    return labels[language][inputType as keyof typeof labels[typeof language]] || inputType;
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task, index) => (
        <Card 
          key={task.id}
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group border-2 hover:border-green-300"
          onClick={() => onTaskSelect(task)}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="text-center">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              {task.icon}
            </div>
            <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
              {task.title}
            </CardTitle>
            <CardDescription className="text-sm">
              {task.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge 
              variant="secondary" 
              className="w-full justify-center gap-2 bg-green-50 text-green-700 hover:bg-green-100"
            >
              {getInputTypeIcon(task.inputType)}
              {getInputTypeLabel(task.inputType)}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
