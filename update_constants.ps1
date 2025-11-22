# Script to add voice-related strings to constants.ts

$filePath = "constants.ts"
$content = Get-Content $filePath -Raw

# First, update the type definition for chat section
$oldTypeDefinition = @"
  chat: {
    initialMessage: LocalizedString;
    placeholder: LocalizedString;
  }
"@

$newTypeDefinition = @"
  chat: {
    initialMessage: LocalizedString;
    placeholder: LocalizedString;
    voiceButton: LocalizedString;
    listening: LocalizedString;
    speaking: LocalizedString;
    voiceNotSupported: LocalizedString;
    microphoneError: LocalizedString;
    voiceError: LocalizedString;
  }
"@

$content = $content.Replace($oldTypeDefinition, $newTypeDefinition)

# Second, update the chat content section
$oldChatContent = @"
  chat: {
    initialMessage: {
      [Language.PT]: "Olá! Sou o assistente virtual do Comporta Design 2026. Como posso ajudar?",
      [Language.EN]: "Hello! I'm the virtual assistant for Comporta Design 2026. How can I help you?",
    },
    placeholder: {
      [Language.PT]: "Digite a sua mensagem...",
      [Language.EN]: "Type your message...",
    }
  }
"@

$newChatContent = @"
  chat: {
    initialMessage: {
      [Language.PT]: "Olá! Sou o assistente virtual do Comporta Design 2026. Como posso ajudar?",
      [Language.EN]: "Hello! I'm the virtual assistant for Comporta Design 2026. How can I help you?",
    },
    placeholder: {
      [Language.PT]: "Digite a sua mensagem...",
      [Language.EN]: "Type your message...",
    },
    voiceButton: {
      [Language.PT]: "Falar",
      [Language.EN]: "Speak",
    },
    listening: {
      [Language.PT]: "A ouvir...",
      [Language.EN]: "Listening...",
    },
    speaking: {
      [Language.PT]: "A falar...",
      [Language.EN]: "Speaking...",
    },
    voiceNotSupported: {
      [Language.PT]: "Voz não suportada neste navegador",
      [Language.EN]: "Voice not supported in this browser",
    },
    microphoneError: {
      [Language.PT]: "Erro ao aceder ao microfone. Verifique as permissões.",
      [Language.EN]: "Error accessing microphone. Please check permissions.",
    },
    voiceError: {
      [Language.PT]: "Erro no reconhecimento de voz. Tente novamente.",
      [Language.EN]: "Voice recognition error. Please try again.",
    }
  }
"@

$content = $content.Replace($oldChatContent, $newChatContent)

# Write the updated content back to the file
$content | Out-File -FilePath $filePath -Encoding utf8 -NoNewline

Write-Host "Successfully updated constants.ts with voice-related strings"
