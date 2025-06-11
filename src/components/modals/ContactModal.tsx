"use client";

import {
  useState,
  useCallback,
  useEffect,
  useTransition,
  createContext,
  useContext,
} from "react";
import { z } from "zod";
import Modal from "../Modal";

// Estado global para el modal
let isContactModalOpen = false;
let setContactModalOpenCallback: ((isOpen: boolean) => void) | null = null;

interface ContactModalProps {
  isOpen: boolean;
}

// Schema de validación con Zod
const contactSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  priority: z.enum(["low", "normal", "high", "urgent"]),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Contexto para el estado del modal
const ContactModalContext = createContext<{
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} | null>(null);

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
}

export function ContactModal({ isOpen }: ContactModalProps) {
  const [isPending, startTransition] = useTransition();
  const { closeModal } = useContactModal();
  const [formData, setFormData] = useState<ContactFormData>({
    subject: "",
    message: "",
    priority: "normal",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Wrapper para el evento de cierre usando startTransition
  const handleClose = () => {
    startTransition(() => {
      closeModal();
    });
  };

  const validateField = (field: keyof ContactFormData, value: any) => {
    try {
      // Validar el campo específico usando safeParse
      const fieldSchema = contactSchema.shape[field];
      const result = fieldSchema.safeParse(value);

      if (result.success) {
        // Limpiar error si la validación es exitosa
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      } else {
        // Establecer error si la validación falla
        setErrors((prev) => ({
          ...prev,
          [field]: result.error.errors[0].message,
        }));
      }
    } catch (error) {
      // Fallback en caso de error inesperado
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const handleInputChange = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      validateField(field, value);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar todo el formulario
      const validatedData = contactSchema.parse(formData);

      // Simular envío

      // Limpiar errores
      setErrors({});

      // Mantener loading por 2 segundos
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);

        // Mostrar confirmación por 2 segundos más
        setTimeout(() => {
          handleClose();
          setFormData({ subject: "", message: "", priority: "normal" });
          setIsSuccess(false);
        }, 2000);
      }, 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      setIsSubmitting(false);
    }
  };

  const isFormValid = (() => {
    // Verificar que no hay errores activos (excluyendo undefined)
    const hasErrors = Object.values(errors).some(
      (error) => error !== undefined
    );

    // Verificar que los campos cumplen los requisitos mínimos
    const subjectValid = formData.subject.length >= 5;
    const messageValid = formData.message.length >= 10;

    return !hasErrors && subjectValid && messageValid;
  })();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Contact Support"
      width="max-w-2xl"
    >
      {isSuccess ? (
        // Success State
        <div className="p-6 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-sm text-gray-400">
              Thank you for contacting us. We've received your message and will
              respond within 24 hours.
            </p>
          </div>
        </div>
      ) : (
        // Form State
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="What can we help you with?"
                className={`w-full bg-[#2a2a2a] border rounded-md px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none transition-colors ${
                  errors.subject
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#3a3a3a] focus:border-blue-500"
                }`}
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Describe your issue or question in detail..."
                rows={6}
                className={`w-full bg-[#2a2a2a] border rounded-md px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none resize-none transition-colors ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#3a3a3a] focus:border-blue-500"
                }`}
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {formData.message.length}/1000 characters
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#2a2a2a]">
            <div className="text-xs text-gray-500">
              We typically respond within 24 hours
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
}
