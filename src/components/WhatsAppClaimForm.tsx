
import { useState } from 'react';
import { Camera, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const WhatsAppClaimForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format phone number for WhatsApp (remove leading zero if present)
    const formattedPhone = phone.startsWith('0') ? '2' + phone : phone;
    const whatsappPhone = '01066677826'; // Pharmacy WhatsApp number
    
    // Create message text
    const messageText = encodeURIComponent(`Name: ${name}\nMessage: ${message}`);
    
    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${whatsappPhone}?text=${messageText}`;
    
    // Open WhatsApp
    window.open(whatsappLink, '_blank');
    
    // Show success toast
    toast({
      title: "Claim Submitted",
      description: "Your claim has been sent to WhatsApp. If you have an image, please send it in the chat.",
      duration: 5000,
    });
    
    // Reset form
    setName('');
    setPhone('');
    setMessage('');
    clearImage();
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6 md:p-8">
      <h2 className="text-2xl font-bold text-navy mb-6">Send Claim to WhatsApp</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your claim here"
            rows={4}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">Claim Image (Optional)</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="flex items-center gap-2"
            >
              <Camera className="h-5 w-5" />
              {image ? 'Change Image' : 'Upload Image'}
            </Button>
            
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            
            {imagePreview && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearImage}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          {imagePreview && (
            <div className="mt-4 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-60 rounded-md object-contain border border-gray-200"
              />
            </div>
          )}
        </div>
        
        <Button
          type="submit"
          className="w-full bg-navy hover:bg-navy-light text-white flex items-center justify-center gap-2 py-6"
        >
          <Send className="h-5 w-5" />
          Send to WhatsApp
        </Button>
      </form>
    </div>
  );
};

export default WhatsAppClaimForm;
