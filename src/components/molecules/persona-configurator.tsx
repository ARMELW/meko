import React from 'react';
import {
  PersonaConfig,
  PersonaLanguage,
  PersonaLevel,
  PersonaLearningStyle,
  PersonaCommunicationStyle,
  PersonaTone,
  PersonaReasoningFramework
} from '../../services/speech/persona.types';
import { textToSpeechService } from '../../services/speech/text-to-speech';
import { useForm, Controller, Path, UseFormWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const personaSchema = z.object({
  language: z.nativeEnum(PersonaLanguage),
  level: z.nativeEnum(PersonaLevel),
  learningStyle: z.nativeEnum(PersonaLearningStyle),
  communicationStyle: z.nativeEnum(PersonaCommunicationStyle),
  tone: z.nativeEnum(PersonaTone),
  reasoningFramework: z.nativeEnum(PersonaReasoningFramework),
  emojis: z.boolean()
});

export const PersonaConfigurator: React.FC = () => {
  const { control, watch } = useForm<PersonaConfig>({
    defaultValues: textToSpeechService.getPersona(),
    resolver: zodResolver(personaSchema)
  });

  React.useEffect(() => {
    const subscription = (watch as UseFormWatch<PersonaConfig>)(values => {
      textToSpeechService.setPersona(values as PersonaConfig);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const renderSelect = (name: Path<PersonaConfig>, options: object) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 capitalize">
        {name.replace(/([A-Z])/g, ' $1')}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {Object.entries(options).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );

  const renderToggle = (name: Path<PersonaConfig>) => (
    <div className="flex items-center mb-4">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            checked={field.value as boolean}
            onChange={e => field.onChange(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        )}
      />
      <label className="ml-2 block text-sm font-medium text-gray-700 capitalize">
        {name.replace(/([A-Z])/g, ' $1')}
      </label>
    </div>
  );

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        Professor Persona Configuration
      </h3>
      <form>
        {renderSelect('language', PersonaLanguage)}
        {renderSelect('level', PersonaLevel)}
        {renderSelect('learningStyle', PersonaLearningStyle)}
        {renderSelect('communicationStyle', PersonaCommunicationStyle)}
        {renderSelect('tone', PersonaTone)}
        {renderSelect('reasoningFramework', PersonaReasoningFramework)}
        {renderToggle('emojis')}
      </form>
    </div>
  );
};
